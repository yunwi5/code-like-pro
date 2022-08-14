const { loginBodySchema, signUpBodySchema } = require('../schemas/authSchemas');

const validateBody = async (req, res, next, schema) => {
    const body = req.body;
    try {
        // If the incoming request object is invalid, it will throw an error.
        await schema.validate(body);
        next();
    } catch (err) {
        console.log(err.message);
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

module.exports = { validateLoginBody, validateSignUpBody };
