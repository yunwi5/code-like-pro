const express = require('express');

const commentController = require('../controller/commentController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

// Routes for editing or deleting the comment of the param id.
router
    .route('/:id')
    .patch(ensureAuthenticated, catchAsync(commentController.patchComment))
    .delete(ensureAuthenticated, catchAsync(commentController.deleteComment));

// Routes for getting and posting the replying comments of the comment of the param id.
router
    .route('/:id/reply')
    .get(catchAsync(commentController.getReplyComments))
    .post(ensureAuthenticated, catchAsync(commentController.postReplyComment));

// Routes for handling user upvote and downvote to the comment of the param id.
router.post('/:id/vote', ensureAuthenticated, catchAsync(commentController.voteComment));

module.exports = router;
