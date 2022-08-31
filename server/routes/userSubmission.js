const express = require('express');
const userSubmissionController = require('../controller/userSubmissionController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

// Run testCases should run even before users make the exercise post. So, it should not use exerciseId.
router.post('/run', ensureAuthenticated, catchAsync(userSubmissionController.runTestCases));
router.post('/:id', ensureAuthenticated, catchAsync(userSubmissionController.postSubmission));

module.exports = router;
