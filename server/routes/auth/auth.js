const { Router } = require('express');
const passport = require('passport');

const authController = require('../../controller/auth/authController');
const catchAsync = require('../../middleware/catchAsync');
const {
    validateLoginBody,
    validateSignUpBody,
} = require('../../middleware/validateRequest');

const router = Router();

router.post(
    '/login',
    validateLoginBody,
    passport.authenticate('local', {
        successMessage: true,
        failureMessage: true,
    }),
    catchAsync(authController.postLogin),
);

router.post('/sign-up', validateSignUpBody, catchAsync(authController.postSignUp));

router.get('/logout', authController.getLogout);

router.get('/login/success', authController.getAuthSuccess);

router.get('/login/failure', authController.getAuthFailure);

module.exports = router;
