const yup = require('yup');
const { testCaseSchema } = require('./testCaseSchema');

const testCasesSchema = yup
    .array()
    .of(testCaseSchema)
    .min(1, 'There should be at least 1 test cases!');

module.exports = { testCasesSchema };
