const express = require('express');
const userSubmissionController = require('../../controller/user/userSubmissionController');

const { ensureAuthenticated } = require('../../middleware/auth');
const catchAsync = require('../../middleware/catchAsync');
const {
    validateRunCodeBody,
    validateUserSubmissionBody,
} = require('../../middleware/validateRequest');

const router = express.Router();

// Run testCases should run even before users make the exercise post. So, it should not use exerciseId.
router.post(
    '/run',
    validateRunCodeBody,
    catchAsync(userSubmissionController.runTestCases),
);

// Post user submission of an exercise to DB
router.post(
    '/:id',
    ensureAuthenticated,
    validateUserSubmissionBody,
    catchAsync(userSubmissionController.postSubmission),
);

module.exports = router;
