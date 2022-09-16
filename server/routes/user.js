const express = require('express');
const userController = require('../controller/userController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

// Get user detail
router.get('/:id', ensureAuthenticated, catchAsync(userController.getUserByID));

// Edit user profile
router.patch('/', ensureAuthenticated, catchAsync(userController.updateUser));

module.exports = router;
