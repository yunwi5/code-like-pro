const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const exerciseReportController = require('../controller/exerciseReportController');

const router = express.Router();

router
    .route('/:id/vote')
    .post(ensureAuthenticated, exerciseReportController.postReportVote)
    .delete(ensureAuthenticated, exerciseReportController.deleteReportVote);

module.exports = router;
