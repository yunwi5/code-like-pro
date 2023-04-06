const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');

const catchAsync = require('../middleware/catchAsync');
const forumPostController = require('../controller/forumPostController');
const {
    validateForumpostBody,
    validateVoteBody,
} = require('../middleware/validateRequest');

const router = express.Router();

router.post(
    '/',
    ensureAuthenticated,
    validateForumpostBody,
    catchAsync(forumPostController.createForumPost),
);

router.get('/', catchAsync(forumPostController.getForumPosts));

// Get forum posts by category such as "Interviews"
router.get('/category/:category', catchAsync(forumPostController.getForumPostByCategory));

router
    .route('/:id')
    .get(catchAsync(forumPostController.getForumPostById))
    .delete(ensureAuthenticated, catchAsync(forumPostController.deleteForumPost));

router.patch(
    '/:id',
    ensureAuthenticated,
    catchAsync(forumPostController.updateForumPost),
);

// Post forum post comment
router.post(
    '/:id/comment',
    ensureAuthenticated,
    catchAsync(forumPostController.postForumPostComment),
);

router.delete(
    '/:id/comment/:commentId',
    ensureAuthenticated,
    catchAsync(forumPostController.deleteForumPostComment),
);

// Post vote
router.post(
    '/:id/vote',
    ensureAuthenticated,
    validateVoteBody,
    catchAsync(forumPostController.postVote),
);

// Remove vote
router.delete(
    '/:id/vote',
    ensureAuthenticated,
    catchAsync(forumPostController.deleteVote),
);

module.exports = router;
