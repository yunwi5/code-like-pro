const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Authentication itself is done by the passport middleware
// Only need to find the user that matches this email
const postLogin = async (req, res) => {
    const { email } = req.body;
    console.log('Log In Function Reached');

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
        errors.push({ message: 'This email is already registered.' });
        return res.status(400).json(errors);
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
    res.json(userToReturn);
};

const getLogout = (req, res, next) => {
    // logout function now takes callback function
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout successful.' });
    });
};

// Helper function
// Do not return password
const getUserToReturn = (user) => {
    // no password
    const userToReturn = {
        id: user._id,
        name: user.name,
        email: user.email,
        date: user.date,
        createdAt: user.createdAt,
    };
    return userToReturn;
};

const controller = {
    postLogin,
    postSignUp,
    getLogout,
};

module.exports = controller;
