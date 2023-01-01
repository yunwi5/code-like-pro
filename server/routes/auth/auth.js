const { Router } = require('express');

const authController = require('../../controller/auth/authController');
const catchAsync = require('../../middleware/catchAsync');
const { ensureAuthenticated } = require('../../middleware/auth');
const {
    validateGoogleAuthBody,
    validateLoginBody,
    validateSignUpBody,
} = require('../../middleware/validateRequest');

const router = Router();

router.post('/google', validateGoogleAuthBody, catchAsync(authController.postGoogleAuth));

router.post('/login', validateLoginBody, catchAsync(authController.postLogin));

router.post('/sign-up', validateSignUpBody, catchAsync(authController.postSignUp));

router.get('/login/success', ensureAuthenticated, authController.getAuthSuccess);

module.exports = router;
