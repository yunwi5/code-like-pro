const Exercise = require('../models/Exercise');
const ExerciseReport = require('../models/ExerciseReport');
const UserSubmission = require('../models/UserSubmission');
const Comment = require('../models/Comment');
const ShowCase = require('../models/ShowCase');

const makeRequest = require('../utils/makeRequest');

const postExercise = async (req, res) => {
    const exerciseBody = req.body;
    const exercise = new Exercise(exerciseBody);
    exercise.author = req.user._id;

    const testCases = exercise.testCases;
    const solutionCode = exercise.solutionCode;
    let language = exercise.language;

    // Iterate through each test case and make request to JOBE server

    const testCasePromises = testCases.map((testCase) => {
        // Append test case to solution code and check if output is right

        const test = solutionCode + '\n\n' + testCase.code;

        const body = {
            run_spec: {
                language_id: language,
                sourcefilename: 'test',
                sourcecode: test,
            },
        };

        const result = makeRequest(body);
        return result;
    });

    const testCaseResults = await Promise.all(testCasePromises);

    for (let i = 0; i < testCaseResults.length; i++) {
        if (testCaseResults[i].stdout.trim() != testCases[i].expectedOutput.trim()) {
            return res.status(400).json({ message: 'Some test cases failed.' });
        }
    }

    await exercise.save();
    console.log('new exercise', exercise);

    res.status(201).json(exercise);
};

const getExercises = async (req, res) => {
    // populate author field with author name
    const exercises = await Exercise.find({}).populate('author', 'name').populate('comments');
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
    const newExercise = new Exercise(exerciseBody);

    const testCases = newExercise.testCases;
    const solutionCode = newExercise.solutionCode;

    let language = newExercise.language;

    const testCasePromises = testCases.map((testCase) => {
        // Append test case to solution code and check if output is right

        const test = solutionCode + '\n' + testCase.code;

        const body = {
            run_spec: {
                language_id: language,
                sourcefilename: 'test',
                sourcecode: test,
            },
        };

        const result = makeRequest(body);
        return result;
    });

    const testCaseResults = await Promise.all(testCasePromises);

    console.log(testCaseResults);
    for (let i = 0; i < testCaseResults.length; i++) {
        if (testCaseResults[i].stdout.trim() != testCases[i].expectedOutput.trim()) {
            return res.status(400).json({ message: 'Some test cases failed.' });
        }
    }

    let updatedExercise;
    try {
        // Make sure the returned object is an updated object.
        updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, exerciseBody, {
            new: true,
        });
    } catch (err) {
        console.log(err.message);
    }
    if (updatedExercise) res.status(201).json(updatedExercise);
    else res.status(404).json(`Exercise with ${req.params.id} not found`);
};

const deleteExercise = async (req, res) => {
    let result; // returns deletedObject if the exercise with the param id was found.
    try {
        result = await Exercise.findByIdAndDelete(req.params.id);
    } catch (err) {
        console.log(err.message);
    }

    if (result != null) {
        return res.status(200).send('Delete successful.');
    } else {
        // If there is an error, or the exercise was not found.
        res.status(404).send(`Exercise ${req.params.id} not found`);
    }
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

/* POST: exercise issue report from the user */
const reportExercise = async (req, res) => {
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
    const user = req.user;

    const exercise = await Exercise.findById(exerciseId);

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

        if (showCase == null) {
            // Construct the showcase object with required attributes.
            showCase = new ShowCase({ code, description, user: req.user });
            exercise.showCases.push(showCase);
        } else {
            // If there is an existing showcase, update its attributes.
            showCase.code = code;
            showCase.description = description;
        }

        // Execute async operations in parallel and await them together.
        const p1 = showCase.save();
        const p2 = exercise.save();
        await Promise.all([p1, p2]);
        res.status(201).json(showCase);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
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
        // await Exercise.findByIdAndUpdate(exerciseId, { $push: newComment });
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
    getExerciseSubmissions,
    reportExercise,
    toggleLikeExercise,
    postExerciseShowcase,
    getExerciseShowcases,
    postExerciseComment,
    getExerciseComments,
};

module.exports = controller;
