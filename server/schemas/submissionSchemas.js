const yup = require('yup');

const { testCaseSchema } = require('./testCaseSchema');
const { LanguageList } = require('../models/enums');

// Schema for running the user code only (not user submission to DB)
const runCodeBodySchema = yup.object({
    code: yup.string().min(5).required('Solution code is required'),
    language: yup.string().oneOf(LanguageList), // should be one of the supported languages
    testCases: yup.array().of(testCaseSchema),
});

// Schema for user code submission for an exercise
// User only needs to send the code.
// The exercise id is part of the API param, and the server finds the corresponding exercise before code execution
const submissionSchema = yup.object({
    code: yup.string().required('Submission code is required'),
});

module.exports = { runCodeBodySchema, submissionSchema };
