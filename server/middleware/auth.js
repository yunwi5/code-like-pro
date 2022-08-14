// middleware to verify if the user is authenticated.
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('User authenticated!');
        return next();
    }
    console.log('User NOT authenticated');

    // Unauthorized status code and message.
    res.status(401).json({ message: 'User not authenticated!' });
};

module.exports = { ensureAuthenticated };
