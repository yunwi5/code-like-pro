const { loginBodySchema, signUpBodySchema } = require('../schemas/authSchemas');
const { showcaseBodySchema } = require('../schemas/showcaseSchema');
const { voteBodySchema } = require('../schemas/voteSchema');
const { forumpostBodySchema } = require('../schemas/forumpostSchema');

const validateBody = async (req, res, next, schema) => {
    const body = req.body;
    try {
        // If the incoming request object is invalid, it will throw an error.
        await schema.validate(body);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Middleware to validate the incoming request body object that is supposed to be a email & password.
const validateLoginBody = async (req, res, next) => {
    return await validateBody(req, res, next, loginBodySchema);
};

// validate sign up request body that is name & email & password
const validateSignUpBody = async (req, res, next) => {
    return await validateBody(req, res, next, signUpBodySchema);
};

// Validate showcase body props before posting
const validateShowcaseBody = async (req, res, next) => {
    return await validateBody(req, res, next, showcaseBodySchema);
};

const validateVoteBody = async (req, res, next) => {
    return await validateBody(req, res, next, voteBodySchema);
};

const validateForumpostBody = async (req, res, next) => {
    return await validateBody(req, res, next, forumpostBodySchema);
}

module.exports = {
    validateLoginBody,
    validateSignUpBody,
    validateShowcaseBody,
    validateVoteBody,
    validateForumpostBody,
};
