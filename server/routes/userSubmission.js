const express = require('express');
const userSubmissionController = require('../controller/userSubmissionController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

router.post('/:id', ensureAuthenticated, catchAsync(userSubmissionController.postSubmission));


module.exports = router;
