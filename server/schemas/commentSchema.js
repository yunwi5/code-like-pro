const yup = require('yup');

const commentBodySchema = yup.object({
    text: yup.string().min(1),
});

module.exports = { commentBodySchema };
