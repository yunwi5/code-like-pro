const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');
const forumPostController = require('../controller/forumPostController');

const router = express.Router();

router.post('/', ensureAuthenticated, catchAsync(forumPostController.createForumPost));

router.get('/', catchAsync(forumPostController.getForumPost));

router.get('/:category', catchAsync(forumPostController.getForumPostByCategory))

router.patch('/:id', ensureAuthenticated, catchAsync(forumPostController.updateForumPost));

module.exports = router;
