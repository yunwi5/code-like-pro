const mongoose = require('mongoose');
const Exercise = require('../../models/Exercise');
const ExerciseReport = require('../../models/ExerciseReport');
const UserSubmission = require('../../models/UserSubmission');
const Comment = require('../../models/Comment');
const ShowCase = require('../../models/ShowCase');
const User = require('../../models/User');

const { constructLanguageFileSpec } = require('../../utils/languageSupport');
const { filterDuplicatedTests } = require('../../utils/testCase.util');
const makeRequest = require('../../utils/makeRequest');

// Helper function to validate test cases
const validateTestCases = async ({ testCases, language, solutionCode }) => {
    // Iterate through each test case and make request to JOBE server
    const testCasePromises = testCases.map((testCase) => {
        // Append test case to solution code and check if output is right
        const body = {
            run_spec: constructLanguageFileSpec(language, solutionCode, testCase.code),
        };

        const result = makeRequest(body);
        return result;
    });

    const testCaseResults = await Promise.all(testCasePromises);

    for (let i = 0; i < testCaseResults.length; i++) {
        if (testCaseResults[i].stdout.trim() != testCases[i].expectedOutput.trim()) {
            return false;
        }
    }
    return true;
};

const postExercise = async (req, res) => {
    const exerciseBody = req.body;
    const exercise = new Exercise(exerciseBody);
    exercise.author = req.user._id;

    const testCases = exercise.testCases;
    const solutionCode = exercise.solutionCode;
    const language = exercise.language;

    const testCasesPassed = await validateTestCases({
        testCases,
        language,
        solutionCode,
    });
    if (!testCasesPassed)
        return res.status(400).json({ message: 'Some test cases failed.' });

    await exercise.save();

    res.status(201).json(exercise);
};

const getExercises = async (req, res) => {
    // populate author field with author name
    const exercises = await Exercise.find({})
        .populate('author', 'name')
        .populate('comments');
    res.status(200).json(exercises);
};

const getExerciseByID = async (req, res) => {
    let exercise;
    try {
        // populate author field with author name
        exercise = await Exercise.findById(req.params.id)
            .populate('author', 'name')
            .populate('comments');
    } catch (err) {
        console.log(err.message);
    }

    if (exercise != null) {
        res.status(200).json(exercise);
    } else {
        res.status(404).json(`Exercise ${req.params.id} not found`);
    }
};

const updateExercise = async (req, res) => {
    // get new exercise and test solution code
    const exerciseBody = req.body;
    const testCases = exerciseBody.testCases;
    const solutionCode = exerciseBody.solutionCode;
    const language = exerciseBody.language;

    const testCasesPassed = await validateTestCases({
        testCases,
        language,
        solutionCode,
    });
    if (!testCasesPassed)
        return res.status(400).json({ message: 'Some test cases failed.' });

    let updatedExercise;
    try {
        // Make sure the returned object is an updated object.
        updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, exerciseBody, {
            new: true,
        });
    } catch (err) {
        console.log(err.message);
    }
    if (updatedExercise) res.status(200).json(updatedExercise);
    else res.status(404).json(`Exercise with ${req.params.id} not found`);
};

const deleteExercise = async (req, res) => {
    try {
        const exerciseId = req.params.id;
        const exercise = await Exercise.findById(exerciseId);

        // If the exercise is not found, return 404
        if (exercise == null)
            return res.status(404).send(`Exercise ${req.params.id} not found`);

        // Shoud clear up all the entities that rely on this exercise
        const showcaseIds = exercise.showCases;
        const commentIds = exercise.comments;
        const reportIds = exercise.reports;

        const exp = exercise.remove();

        // Clear the showcases of this exercise
        const scp = ShowCase.deleteMany({ _id: { $in: showcaseIds } });
        // Clear the comments of this exercise
        const cp = Comment.deleteMany({ _id: { $in: commentIds } });
        // Clear the reports of this exercise
        const erp = ExerciseReport.deleteMany({ _id: { $in: reportIds } });
        const usp = UserSubmission.deleteMany({ exercise: exercise._id });

        // delete result of the exercise
        const [deleteResult, _] = await Promise.all([exp, scp, cp, erp, usp]);

        return res.status(200).json(deleteResult);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(404).send(`Exercise ${req.params.id} not found`);
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

/* GET top rankged exercises based on the 'liked' array length.
Query string: amount, indicating the number of top exercises the frontend wants.  */
const getTopExercises = async (req, res) => {
    let amount = parseInt(req.query.amount);
    if (isNaN(amount) || !amount)
        // Give default amount if the amount query string is invalid.
        amount = 5;

    const topRanked = await Exercise.aggregate()
        .addFields({ length: { $size: '$liked' } })
        .sort({ length: -1 })
        .limit(amount);

    const topRankedPopulated = await Exercise.populate(topRanked, {
        path: 'author',
        select: 'name',
    });

    res.status(200).json(topRankedPopulated);
};

/* GET: all submissions from the exercise of the param id */
const getExerciseSubmissions = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        const submissions = await UserSubmission.find({ exercise: exerciseId });
        // If the returned object is an array, it means success.
        if (Array.isArray(submissions)) res.status(200).json(submissions);
        // If the returned object is not array, it is not a correct response.
        else throw new Error('Submissions should be an array...');
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

/* 
POST: Merge custom tests from users
Req body: Array<{code: string, expectedOutput: string, hidden: boolean}>
*/
const mergeCustomTests = async (req, res) => {
    const exerciseId = req.params.id;
    try {
        // Get the target exercise
        const exercise = await Exercise.findById(exerciseId);
        if (exercise.testCases.length >= 30)
            return res
                .status(406)
                .json({ message: 'The exercise already has at least 30 test cases!' });

        const customTests = req.body;
        // validate custom tests
        const testsValid = await validateTestCases({
            testCases: customTests,
            language: exercise.language,
            solutionCode: exercise.solutionCode,
        });

        if (!testsValid)
            return res.status(403).json({ message: 'Some custom tests are not correct' });

        // Check if there are any duplicated test code except the comments
        // If there are duplicates, remove those duplicates
        const updatedTests = exercise.testCases.concat(customTests);
        const nonDuplicatedTests = filterDuplicatedTests(updatedTests).slice(0, 30);
        const insertedCount = nonDuplicatedTests.length - exercise.testCases.length;

        // Update exercise
        exercise.testCases = nonDuplicatedTests;
        await exercise.save();

        if (insertedCount === 0) return res.status(200).json({ exercise, insertedCount });
        return res.status(201).json({ exercise, insertedCount });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

/* GET: Exercise issue reports as JSON array */
const getExerciseReports = async (req, res) => {
    const exerciseId = req.params.id;
    try {
        const exercise = await Exercise.findById(exerciseId).populate({
            path: 'reports',
            populate: { path: 'user', select: 'name' },
        });
        const reports = exercise.reports;
        return res.status(200).json(reports);
    } catch (err) {
        console.log(err.message);
        return res.status(404).json({ message: `Exercise ${exerciseId} not found.` });
    }
};

/* POST: exercise issue report from the user */
const postExerciseReport = async (req, res) => {
    const exerciseId = req.params.id;
    const { category, description } = req.body;

    const report = new ExerciseReport({ category, description });
    report.user = req.user._id;

    let exercise;
    try {
        // Exercise can be null
        exercise = await Exercise.findById(exerciseId);
    } catch (err) {
        console.log(err.message);
    }

    if (exercise == null) return res.status(404).json(`Exercise ${exerciseId} not found`);

    exercise.reports.push(report);
    const p1 = report.save();
    const p2 = exercise.save();
    await Promise.all([p1, p2]);

    res.status(201).json(report);
};

/*
GET: User likes/undo-likes the exercise,
Exercise stores list of ids of users that like it, User stores the list of exercises he/she likes.
*/
const toggleLikeExercise = async (req, res) => {
    const exerciseId = req.params.id;
    const userId = req.user._id;

    try {
        const exercisePromise = Exercise.findById(exerciseId);
        const userPromise = User.findById(userId);
        const [exercise, user] = await Promise.all([exercisePromise, userPromise]);

        if (exercise.liked.includes(user._id)) {
            const userIndex = exercise.liked.findIndex((id) => id === user._id);
            exercise.liked.splice(userIndex, 1);

            const exerciseIndex = user.liked.findIndex(
                (exId) => exId.toString() === exercise._id.toString(),
            );
            if (exerciseIndex >= 0) user.liked.splice(exerciseIndex, 1);
        } else {
            exercise.liked.push(user._id);
            user.liked.push(exerciseId);
        }

        await exercise.save();
        await user.save();
        res.json(exercise);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

/* GET showcases for the exercise of the param id. */
const getExerciseShowcases = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        // Find the exercise and populate the showcases of that exercise including its user.
        const exercise = await Exercise.findById(exerciseId).populate({
            path: 'showCases',
            populate: { path: 'user', select: ['name', 'pictureUrl'] },
        });
        const showCases = exercise.showCases;
        // Return the list of showcases as JSON
        return res.status(200).json(showCases);
    } catch (err) {
        console.log(err.message);
        return res.status(404).json(`Exercise ${exerciseId} not found`);
    }
};

/* Post showcase for the exercise of the param id. */
/* Req body: {code: string, description: string} */
const postExerciseShowcase = async (req, res) => {
    const exerciseId = req.params.id;
    const { code, description } = req.body;

    try {
        const exercise = await Exercise.findById(exerciseId).populate('showCases');
        if (exercise == null) return res.status(404).json('Exercise not found');

        // Identify if the user previosuly made the showcase for this exercise.
        let showCase = exercise.showCases.find(
            (show) => show.user?.toString() === req.user._id.toString(),
        );

        let statusCode;
        if (showCase == null) {
            // Construct the showcase object with required attributes.
            showCase = new ShowCase({ code, description, user: req.user });
            exercise.showCases.push(showCase);
            statusCode = 201;
        } else {
            // If there is an existing showcase, update its attributes.
            showCase.code = code;
            showCase.description = description;
            statusCode = 200;
        }

        // Execute async operations in parallel and await them together.
        const p1 = showCase.save();
        const p2 = exercise.save();
        await Promise.all([p1, p2]);
        res.status(statusCode).json(showCase);
    } catch (err) {
        if (err instanceof mongoose.Error) {
            return res.status(400).json({ message: 'Bad request' });
        }
        return res.status(500).json('Invalid exercise id');
    }
};

/* Get all user comments of the exercise of req.params.id,
returns the list of comments as a JSON list. */
const getExerciseComments = async (req, res) => {
    const exerciseId = req.params.id;

    try {
        const exercise = await Exercise.findById(exerciseId).populate({
            path: 'comments',
            populate: { path: 'user', select: ['email', 'name', 'pictureUrl'] },
        });
        const comments = exercise.comments;

        res.status(200).json(comments);
    } catch (err) {
        console.log(err.message);
        res.status(404).json('Exercise was not found.');
    }
};

/* Exercise comment APIs */
/* User should be authenticated before posting a comment */
const postExerciseComment = async (req, res) => {
    const exerciseId = req.params.id;
    const { text } = req.body;

    try {
        // Construct the comment object with required attributes.
        const newComment = new Comment({ text, user: req.user });

        // Find the exercise and push the new comment to its 'comments' list.
        const exercise = await Exercise.findById(exerciseId);
        if (exercise == null) return res.status(404).json('Exercise not found');

        exercise.comments.push(newComment);
        const commentPromise = newComment.save();
        const exercisePromise = exercise.save();
        await Promise.all([commentPromise, exercisePromise]);
        res.status(201).json(newComment);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

const controller = {
    postExercise,
    getExercises,
    getExerciseByID,
    updateExercise,
    deleteExercise,
    getTopExercises,
    getExerciseSubmissions,
    mergeCustomTests,
    getExerciseReports,
    postExerciseReport,
    toggleLikeExercise,
    postExerciseShowcase,
    getExerciseShowcases,
    postExerciseComment,
    getExerciseComments,
};

module.exports = controller;
