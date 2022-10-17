const yup = require('yup');
const { LanguageList } = require('../models/enums');

// Schema for running the user code only (not user submission to DB)
const runCodeBodySchema = yup.object({
    code: yup.string().min(5).required('Solution code is required'),
    language: yup.string().oneOf(LanguageList), // should be one of the supported languages
    testCases: yup.array().of(
        yup.object().shape({
            code: yup.string().required(),
            expectedOutput: yup.string().required(),
            hidden: yup.boolean(),
        }),
    ),
});

module.exports = { runCodeBodySchema };
