const Exercise = require('../models/Exercise');
const UserSubmission = require('../models/UserSubmission');
const User = require('../models/User');
const makeRequest = require('../utils/makeRequest');

/*
Run the code for users to run their code. It does not store anything to the database.
It gets the code from the user, because they should be able to call this function even before creating exercises.

Request body: {code: string, language: string (language_code),  testCases: Array<{code, expectedOutput}>}
Response json: Array<{correct: boolean, actualOutput: string, expectedOutput: string}>
*/
const runTestCases = async (req, res) => {
    const { code, language, testCases } = req.body;

    const testCasePromises = testCases.map((testCase) => {
        const test = code + '\n\n' + testCase.code;

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

    const feedbackArray = [];

    for (let i = 0; i < testCaseResults.length; i++) {
        const result = testCaseResults[i].stdout.trim();

        const feedback = { actualOutput: result, expectedOutput: testCases[i].expectedOutput };

        if (result !== testCases[i].expectedOutput.trim()) {
            feedback.correct = false;
        } else {
            feedback.correct = true;
        }
        feedbackArray.push(feedback);
    }

    return res.status(200).json(feedbackArray);
};

/*
Post user submission of the exercise attempt, into the database.
Request body: {code: string}
Response JSON: UserSubmission Object
*/
const postSubmission = async (req, res) => {
    const exerciseId = req.params.id;
    const submission = req.body;

    const user = await User.findById(req.user._id);

    // Prevents inserting the user submission of the same user and the same exercise multiple times.
    // returns null if the user did not submit code for this exercise previously.
    let userSubmission = await UserSubmission.findOne({
        exercise: exerciseId,
        user: req.user._id,
    });

    if (userSubmission == null) {
        // If the existing submission is not found, create one.
        userSubmission = new UserSubmission({ code: submission.code });
    } else {
        // If found, update the submission rather than creating a new one.
        userSubmission.code = submission.code;
        userSubmission.postedAt = Date.now();
    }

    const exercise = await Exercise.findById(exerciseId);
    const testCases = exercise.testCases;
    let language = exercise.language;

    const testCasePromises = testCases.map((testCase) => {
        // Append test case to solution code and check if output is right

        const test = userSubmission.code + '\n' + testCase.code;

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

    let incorrectCount = 0;
    for (let i = 0; i < testCaseResults.length; i++) {
        const result = testCaseResults[i].stdout.trim();
        if (result != testCases[i].expectedOutput.trim()) {
            incorrectCount++;
        }
    }

    if (incorrectCount === 0) userSubmission.correct = true;
    else userSubmission.correct = false;

    // Add exercise and user reference to the userSubmission and save it.
    userSubmission.exercise = exercise;
    userSubmission.user = user;
    await userSubmission.save();

    res.status(201).json(userSubmission);
};

const controller = {
    postSubmission,
    runTestCases,
};

module.exports = controller;
