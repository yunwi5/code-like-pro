const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Authentication itself is done by the passport middleware
// Only need to find the user that matches this email
const postLogin = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const userToReturn = getUserToReturn(user);
    return res.status(200).json({ message: 'Login successful!', user: userToReturn });
};

const postSignUp = async (req, res) => {
    const { email, name, password } = req.body;
    let errors = [];

    // check required fields
    if (!name || !email || !password) {
        errors.push({ message: 'Register form has missing fields' });
    }

    // password at least 6 chars
    if (password && password.length < 6) {
        errors.push({ message: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0 || !password) {
        return res.status(400).json(errors);
    }

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
    res.json({ success: true, message: 'Register successful!', user: userToReturn });
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
    };
    return userToReturn;
};

const controller = {
    postLogin,
    postSignUp,
    getLogout,
};

module.exports = controller;
