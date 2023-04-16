const express = require('express');
const showCaseController = require('../controller/showCaseController');
const { ensureAuthenticated } = require('../middleware/auth');

// middleware imports
const catchAsync = require('../middleware/catchAsync');
const {
    validateShowcaseBody,
    validateVoteBody,
} = require('../middleware/validateRequest');

const router = express.Router();

// Get show case
router.get('/:id', ensureAuthenticated, catchAsync(showCaseController.getShowCaseByID));

// Get all show cases
router.get('/', ensureAuthenticated, catchAsync(showCaseController.getShowCase));

// Delete show case
router.delete('/:id', ensureAuthenticated, catchAsync(showCaseController.deleteShowCase));

// Create show case
router.post(
    '/',
    ensureAuthenticated,
    validateShowcaseBody,
    catchAsync(showCaseController.postShowCase),
);

// Edit show case
router.patch('/:id', ensureAuthenticated, catchAsync(showCaseController.updateShowCase));

// Get comments
router.get(
    '/:id/comment',
    catchAsync(showCaseController.getComments),
);

// Post comment
router.post(
    '/:id/comment',
    ensureAuthenticated,
    catchAsync(showCaseController.postComment),
);

// Post vote
router.post(
    '/:id/vote',
    ensureAuthenticated,
    validateVoteBody,
    catchAsync(showCaseController.postVote),
);

// Remove vote
router.delete(
    '/:id/vote',
    ensureAuthenticated,
    catchAsync(showCaseController.deleteVote),
);

module.exports = router;
