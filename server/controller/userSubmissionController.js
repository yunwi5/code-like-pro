const Exercise = require('../models/Exercise');
const UserSubmission = require('../models/UserSubmission');
const User = require('../models/User');
const makeRequest = require('../utils/makeRequest');



const postSubmission = async (req, res) => {
    const submission = req.body;
    const userSubmission = new UserSubmission(submission);

    const exercise =  await Exercise.findById(req.params.id);
    const testCases = exercise.testCases;

    let language = exercise.language;

    const testCasePromises = testCases.map((testCase) => {
        // Append test case to solution code and check if output is right

        const test = userSubmission.code + "\n" + testCase.testCode;


        const body = {
            run_spec: {
                language_id: language,
                sourcefilename: 'test',
                sourcecode: test,
            },
        };

        const result =  makeRequest(body);
        return result;

    });

    const testCaseResults = await Promise.all(testCasePromises);

    console.log(testCaseResults);
    for (let i = 0; i < testCaseResults.length; i++) {
        const result = testCaseResults[i].stdout.trim()
        if (result != testCases[i].expectedOutput.trim()) {
            userSubmission.status.push(false);
        }
        userSubmission.results.push(result);
        userSubmission.status.push(true);
    }

    await userSubmission.save();

    exercise.submissions.push(userSubmission._id);
    await exercise.save();

    const user = await User.findById(req.user._id);
    user.submissions.push(userSubmission._id);
    await user.save();


    res.status(201).json(userSubmission);

};

const controller = {
    postSubmission,
};

module.exports = controller;
