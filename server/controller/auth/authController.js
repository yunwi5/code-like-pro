const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Authentication itself is done by the passport middleware
// Only need to find the user that matches this email
const postLogin = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const userToReturn = getUserToReturn(user);
    return res.status(200).json(userToReturn);
};

// Incoming request data validation is done by the middleware.
const postSignUp = async (req, res) => {
    const { email, name, password } = req.body;

    // check existing user with this email (email should be unique)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'This email is already registered.' });
    }

    // encrypt password
    // generate salt with 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // validation passed
    const newUser = new User({ email, name, password: hashedPassword });
    console.log('new user:', newUser);
    await newUser.save();

    const userToReturn = getUserToReturn(newUser);
    res.status(201).json(userToReturn);
};

const getLogout = (req, res, next) => {
    // logout function now takes callback function
    req.logout((err) => {
        if (err) next(err);
        res.status(200).json({ message: 'Logout successful' });
    });
};

const getAuthSuccess = (req, res) => {
    // DO NOT SET HEADERS TWICE (CORS ERROR)
    if (req.user) {
        res.status(200).json(req.user);
        return;
    }
    res.status(404).json({
        success: false,
        message: 'User not found',
        cookies: req.cookies,
    });
};

const getAuthFailure = (req, res) => {
    const statusCode = req.statusCode ?? 401;
    res.status(statusCode).json({
        success: false,
        message: 'Authentication did not work...',
    });
};

// Helper function
// Do not return password
const getUserToReturn = (user) => {
    const userDoc = user._doc;
    delete userDoc.password;
    return userDoc;
};

const controller = {
    postLogin,
    postSignUp,
    getLogout,
    getAuthSuccess,
    getAuthFailure,
};

module.exports = controller;
