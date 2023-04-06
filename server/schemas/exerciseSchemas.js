const yup = require('yup');
const { LanguageList } = require('../models/enums');
const { testCaseSchema } = require('./testCaseSchema');

const exerciseBodySchema = yup.object({
    name: yup.string().min(2).required('Forum post name is required'),
    difficulty: yup.string().required('Difficulty is required'),
    prompt: yup.string().required('Prompt is required'),
    language: yup.string().oneOf(LanguageList).required('Language is required'), // should be one of the supported languages
    solutionCode: yup.string().required('Solution code is required'),
    startingTemplate: yup.string(),
    tags: yup.array().of(yup.string()),
    testCases: yup
        .array()
        .of(testCaseSchema)
        .min(3, 'There should be at least 3 test cases!'),
});

module.exports = { exerciseBodySchema };
