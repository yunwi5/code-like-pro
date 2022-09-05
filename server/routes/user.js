const express = require('express');
const userController = require('../controller/userController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

router.get('/:id', ensureAuthenticated, catchAsync(userController.getUserByID));

module.exports = router;