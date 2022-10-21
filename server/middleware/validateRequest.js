const { loginBodySchema, signUpBodySchema } = require('../schemas/authSchemas');
const { exerciseBodySchema } = require('../schemas/exerciseSchemas');
const { showcaseBodySchema } = require('../schemas/showcaseSchema');
const { voteBodySchema } = require('../schemas/voteSchema');
const { forumpostBodySchema } = require('../schemas/forumpostSchema');
const { commentBodySchema } = require('../schemas/commentSchema');
const { runCodeBodySchema, submissionSchema } = require('../schemas/submissionSchemas');

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

const validateExerciseBody = async (req, res, next) => {
    return await validateBody(req, res, next, exerciseBodySchema);
};

// Validate run user code body
const validateRunCodeBody = async (req, res, next) => {
    return await validateBody(req, res, next, runCodeBodySchema);
};

// Validate user submission body
const validateUserSubmissionBody = async (req, res, next) => {
    return await validateBody(req, res, next, submissionSchema);
};

// Validate showcase body props before posting
const validateShowcaseBody = async (req, res, next) => {
    return await validateBody(req, res, next, showcaseBodySchema);
};

// Validate comment body props before post or patch
const validateCommentBody = async (req, res, next) => {
    return await validateBody(req, res, next, commentBodySchema);
};

const validateVoteBody = async (req, res, next) => {
    return await validateBody(req, res, next, voteBodySchema);
};

const validateForumpostBody = async (req, res, next) => {
    return await validateBody(req, res, next, forumpostBodySchema);
};

module.exports = {
    validateLoginBody,
    validateSignUpBody,
    validateExerciseBody,
    validateRunCodeBody,
    validateUserSubmissionBody,
    validateShowcaseBody,
    validateCommentBody,
    validateVoteBody,
    validateForumpostBody,
};
