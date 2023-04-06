const yup = require('yup');

const showcaseBodySchema = yup.object({
    description: yup.string().min(3),
    code: yup.string().min(5).required('Showcase code is required'),
});

module.exports = { showcaseBodySchema };
