const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');
const forumPostController = require('../controller/forumPostController');

const router = express.Router();

router.post('/', ensureAuthenticated, catchAsync(forumPostController.createForumPost));

router.get('/', catchAsync(forumPostController.getForumPosts));

// Get forum posts by category such as "Interviews"
router.get('/category/:category', catchAsync(forumPostController.getForumPostByCategory));

router
    .route('/:id')
    .get(catchAsync(forumPostController.getForumPostById))
    .delete(ensureAuthenticated, catchAsync(forumPostController.deleteForumPost));

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

// Post forum user like(favorite) functionality
router.post(
    '/:id/like',
    ensureAuthenticated,
    catchAsync(forumPostController.postForumPostLike),
);

module.exports = router;
