// middleware to verify if the user is authenticated.
const ensureAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated);
    if (req.isAuthenticated()) {
        console.log('User authenticated!');
        return next();
    }
    console.log('User NOT authenticated');

    // redirect to just home route - can be changed later on
    res.status(401).json({ message: 'User not authenticated!' });
};

module.exports = { ensureAuthenticated };
