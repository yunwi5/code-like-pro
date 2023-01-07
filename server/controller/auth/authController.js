const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const User = require('../../models/User');
const keys = require('../../config/keys');

const signJwtToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            pictureUrl: user.pictureUrl || '',
        },
        keys.JwtSecret,
        { expiresIn: '1d' },
    );
};

const postGoogleAuth = async (req, res) => {
    const { credential } = req.body;
    const { name, email, sub, picture, email_verified } = jwtDecode(credential);

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
        console.log('New google user:', newUser);
        await newUser.save();

        const token = signJwtToken(newUser);
        res.status(201).json({ access_token: token, user: getUserToReturn(newUser) });
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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // validation passed
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    const token = signJwtToken(newUser);
    res.status(201).json({ access_token: token, user: getUserToReturn(newUser) });
};

const getAuthSuccess = (req, res) => {
    res.status(200).json(req.user);
};

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
};

module.exports = controller;
