const Exercise = require('../models/Exercise');

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
    // populate author field with author name
    const exercise = await Exercise.findById(req.params.id).populate('author', 'name');
    res.status(200).json(exercise);
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

    // Make sure the returned object is an updated object.
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, exerciseBody, {
        new: true,
    });
    res.status(201).json(updatedExercise);
};

const deleteExercise = async (req, res) => {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Delete successful.' });
};

const controller = {
    postExercise,
    getExercises,
    getExerciseByID,
    updateExercise,
    deleteExercise,
};

module.exports = controller;
