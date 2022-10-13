const yup = require('yup');

const voteBodySchema = yup.object({
    // Validate vote type - only two 'up' | 'down'
    type: yup.string().oneOf(['up', 'down']),
});

module.exports = { voteBodySchema };
