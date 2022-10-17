const yup = require('yup');

const testCaseSchema = yup.object().shape({
    code: yup.string().required(),
    expectedOutput: yup.string().required(),
    hidden: yup.boolean(),
});

module.exports = { testCaseSchema };
