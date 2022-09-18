const express = require('express');
const showCaseController = require('../controller/showCaseController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

// Get show case
router.get('/:id', ensureAuthenticated, catchAsync(showCaseController.getShowCaseByID));

// Get all show cases
router.get('/', ensureAuthenticated, catchAsync(showCaseController.getShowCase));

// Delete show case
router.delete('/:id', ensureAuthenticated, catchAsync(showCaseController.deleteShowCase));

// Create show case
router.post('/', ensureAuthenticated, catchAsync(showCaseController.postShowCase));

// Edit show case
router.patch('/:id', ensureAuthenticated, catchAsync(showCaseController.updateShowCase));

module.exports = router;
