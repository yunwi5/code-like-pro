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
            // userSubmission.status.push(false);
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
    const submission = req.body;

    const user = await User.findById(req.user._id);
    const userSubmission = new UserSubmission({ code: submission.code });
    console.log('new submission:', userSubmission);

    const exercise = await Exercise.findById(req.params.id);
    const testCases = exercise.testCases;
    let language = exercise.language;

    // Store the language in the submission so that it is easily to calculate the language statistics for user submissions.
    userSubmission.language = language;

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

    console.log(testCaseResults);
    let incorrectCount = 0;

    for (let i = 0; i < testCaseResults.length; i++) {
        const result = testCaseResults[i].stdout.trim();
        if (result != testCases[i].expectedOutput.trim()) {
            incorrectCount++;
        }
    }

    // default correct is false.
    if (incorrectCount === 0) {
        userSubmission.correct = true;
    }

    await userSubmission.save();

    exercise.submissions.push(userSubmission._id);
    await exercise.save();

    user.submissions.push(userSubmission._id);
    await user.save();

    res.status(201).json(userSubmission);
};

const controller = {
    postSubmission,
    runTestCases,
};

module.exports = controller;
