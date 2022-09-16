const { Router } = require('express');
const passport = require('passport');
const keys = require('../../config/keys');

const router = Router();

// Google Authentication
router.route('/login').get(
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    }),
);

router.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: keys.ClientBaseURL,
        failureMessage: true,
        failureRedirect: `${keys.ClientBaseURL}/login`,
    }),
);

module.exports = router;
