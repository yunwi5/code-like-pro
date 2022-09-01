const Exercise = require('../models/Exercise');
const ExerciseReport = require('../models/ExerciseReport');

const makeRequest = require('../utils/makeRequest');

const postExercise = async (req, res) => {
    const exerciseBody = req.body;
    const exercise = new Exercise(exerciseBody);
    exercise.author = req.user._id;

    // Check solutionCode works

    const testCases = exercise.testCases;
    const solutionCode = exercise.solutionCode;
    let language = exercise.language;
    // Should need to make sure language_code is received from the client.

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

const controller = {
    postExercise,
    getExercises,
    getExerciseByID,
    updateExercise,
    deleteExercise,
    reportExercise,
};

module.exports = controller;
