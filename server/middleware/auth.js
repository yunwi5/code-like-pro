const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

// middleware to verify if the user is authenticated.
const ensureAuthenticated = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        if (token) {
            const decodedData = jwt.verify(token, keys.JwtSecret);

            const user = {
                _id: decodedData._id,
                name: decodedData.name,
                email: decodedData.email,
                picture: decodedData.picture,
            };
            req.user = user;
        } else {
            throw new Error('Cannot decode the token!');
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: 'User not authenticated!' });
    }
};

module.exports = { ensureAuthenticated };
