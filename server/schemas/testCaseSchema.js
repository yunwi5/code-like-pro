const yup = require('yup');

const testCaseSchema = yup.object().shape({
    code: yup.string(),
    expectedOutput: yup.string(),
    hidden: yup.boolean(),
});

module.exports = { testCaseSchema };
