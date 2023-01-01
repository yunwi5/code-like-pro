const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const keys = require('../../config/keys');

const signJwtToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
        },
        keys.JwtSecret,
        { expiresIn: '1h' },
    );
};

const postGoogleAuth = async (req, res) => {
    // {name: string, email: string, sub: string, picture: string, email_verified: boolean}
    const googleCredentials = req.body;

    // better to decode the credential on the backend for security
    const { name, email, sub, picture, email_verified } = googleCredentials;

    if (!email_verified) return res.status(403).json({ message: 'Email not verified' });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // sign in
        const token = signJwtToken(existingUser);

        res.status(200).json({
            access_token: token,
            user: getUserToReturn(existingUser),
        });
    } else {
        // sign up
        // password should be optional perhaps
        const newUser = new User({ email, name, pictureUrl: picture, password: sub });
        await newUser.save();
        res.status(201).json(getUserToReturn(newUser));
    }
};

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });

        const passwordCorrect = bcrypt.compareSync(password, existingUser.password); // false
        if (!passwordCorrect)
            return res.status(401).json({ message: 'Wrong credentials' });

        const token = signJwtToken(existingUser);
        return res.status(200).json({
            access_token: token,
            user: getUserToReturn(existingUser),
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Authentication itself is done by the passport middleware
// Only need to find the user that matches this email
// const postLogin = async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     const userToReturn = getUserToReturn(user);

//     return res.status(200).json(userToReturn);
// };

// Incoming request data validation is done by the middleware.
const postSignUp = async (req, res) => {
    const { email, name, password } = req.body;

    // check existing user with this email (email should be unique)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(403).json({
            message:
                'This email is already registered. Only one account can be created from a single email.',
        });
    }

    // encrypt password
    // generate salt with 10
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // validation passed
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    const token = signJwtToken(newUser);
    const userToReturn = getUserToReturn({ access_token: token, user: newUser });
    res.status(201).json(userToReturn);
};

// const getLogout = (req, res, next) => {
//     // logout function now takes callback function
//     req.logout((err) => {
//         if (err) next(err);
//         res.status(200).json({ message: 'Logout successful' });
//     });
// };

const getAuthSuccess = (req, res) => {
    console.log('req.user:', req.user);

    res.status(200).json({ user: req.user });
};

// const getAuthFailure = (req, res) => {
//     const statusCode = req.statusCode ?? 401;
//     res.status(statusCode).json({
//         success: false,
//         message: 'Authentication did not work...',
//     });
// };

// Helper function
// Do not return password
const getUserToReturn = (user) => {
    const userDoc = user._doc;
    delete userDoc.password;
    return userDoc;
};

const controller = {
    postGoogleAuth,
    postLogin,
    postSignUp,
    getAuthSuccess,
    // getLogout,
    // getAuthFailure,
};

module.exports = controller;
