const express = require('express');
const passport = require('passport');
const authController = require('../../controller/auth/authLocalController');
const catchAsync = require('../../middleware/catchAsync');
const { validateLoginBody, validateSignUpBody } = require('../../middleware/validateRequest');

const router = express.Router();

router.post(
    '/login',
    validateLoginBody,
    passport.authenticate('local', {
        // successRedirect: keys.ClientRedirectURL,
        successMessage: true,
        failureMessage: true,
    }),
    catchAsync(authController.postLogin),
);

router.post('/sign-up', validateSignUpBody, catchAsync(authController.postSignUp));

router.get('/logout', authController.getLogout);

module.exports = router;
