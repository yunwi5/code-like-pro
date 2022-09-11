const Exercise = require('../models/Exercise');
const ExerciseReport = require('../models/ExerciseReport');
const Comment = require('../models/Comment');

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
        console.log(test);

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

    await exercise.save();
    console.log('new exercise', exercise);

    res.status(201).json(exercise);
};

const getExercises = async (req, res) => {
    // populate author field with author name
    const exercises = await Exercise.find({}).populate('author', 'name');
    res.status(200).json(exercises);
};

const getExerciseByID = async (req, res) => {
    let exercise;
    try {
        // populate author field with author name
        exercise = await Exercise.findById(req.params.id).populate('author', 'name');
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

/* Exercise comment APIs */
/* User should be authenticated before posting a comment */
const postExerciseComment = async (req, res) => {
    const exerciseId = req.params.id;
    const { text } = req.body;
    // Construct the comment object with required attributes.
    const newComment = new Comment({ text, user: req.user });

    // Find the exercise and push the new comment to its 'comments' list.
    // await Exercise.findByIdAndUpdate(exerciseId, { $push: newComment });
    const exercise = await Exercise.findById(exerciseId);
    exercise.comments.push(newComment);
    const commentPromise = newComment.save();
    const exercisePromise = exercise.save();
    await Promise.all([commentPromise, exercisePromise]);

    res.status(201).json(newComment);
};
/* Get all user comments of the exercise of req.params.id,
returns the list of comments as a JSON list. */
const getExerciseComments = async (req, res) => {
    const exerciseId = req.params.id;

    const exercise = await Exercise.findById(exerciseId).populate({
        path: 'comments',
        populate: { path: 'user', select: ['email', 'name', 'pictureUrl'] },
    });
    const comments = exercise.comments;

    res.status(200).json(comments);
};

const controller = {
    postExercise,
    getExercises,
    getExerciseByID,
    updateExercise,
    deleteExercise,
    reportExercise,
    toggleLikeExercise,
    postExerciseComment,
    getExerciseComments,
};

module.exports = controller;
