// middleware to verify if the user is authenticated.
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // Unauthorized status code and message.
    return res.status(401).json({ message: 'User not authenticated!' });
};

module.exports = { ensureAuthenticated };
