const express = require('express');

const commentController = require('../controller/commentController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');
const {
    validateCommentBody,
    validateVoteBody,
} = require('../middleware/validateRequest');

const router = express.Router();

// Routes for editing or deleting the comment of the param id.
router
    .route('/:id')
    .patch(
        ensureAuthenticated,
        validateCommentBody,
        catchAsync(commentController.patchComment),
    )
    .delete(ensureAuthenticated, catchAsync(commentController.deleteComment));

// Routes for getting and posting the replying comments of the comment of the param id.
router
    .route('/:id/reply')
    .get(catchAsync(commentController.getReplyComments))
    .post(
        ensureAuthenticated,
        validateCommentBody,
        catchAsync(commentController.postReplyComment),
    );

// Routes for handling user upvote and downvote to the comment of the param id.
router
    .route('/:id/vote')
    .post(
        ensureAuthenticated,
        validateVoteBody,
        catchAsync(commentController.voteComment),
    )
    .delete(ensureAuthenticated, catchAsync(commentController.cancelVoteComment));

module.exports = router;
