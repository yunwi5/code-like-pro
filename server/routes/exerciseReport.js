const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');
const exerciseReportController = require('../controller/exerciseReportController');

const router = express.Router();

router
    .route('/:id/vote')
    .post(ensureAuthenticated, catchAsync(exerciseReportController.postReportVote))
    .delete(ensureAuthenticated, catchAsync(exerciseReportController.deleteReportVote));

module.exports = router;
