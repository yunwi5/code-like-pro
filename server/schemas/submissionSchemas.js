const yup = require('yup');

const { testCaseSchema } = require('./testCaseSchema');
const { LanguageList } = require('../models/enums');

// Schema for running the user code only (not user submission to DB)
const runCodeBodySchema = yup.object({
    code: yup.string().min(5).required('Solution code is required'),
    language: yup.string().oneOf(LanguageList), // should be one of the supported languages
    testCases: yup.array().of(testCaseSchema),
});

module.exports = { runCodeBodySchema };
