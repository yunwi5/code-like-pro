const express = require('express');
const userController = require('../../controller/user/userController');
const { ensureAuthenticated } = require('../../middleware/auth');
const catchAsync = require('../../middleware/catchAsync');

const router = express.Router();

// Get user detail
router.get(
    '/:id/detail',
    ensureAuthenticated,
    catchAsync(userController.getUserDetailById),
);

// Get user basic info
router.get('/:id', catchAsync(userController.getUserById));

// Get user badges (as an array of badge objects)
router.get('/:id/badge', catchAsync(userController.getUserBadges));

// Edit user profile
router.patch('/', ensureAuthenticated, catchAsync(userController.updateUser));

module.exports = router;
