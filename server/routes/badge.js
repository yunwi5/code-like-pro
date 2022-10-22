const express = require('express');
const badgeController = require('../controller/badgeController');

const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');
const router = express.Router();

// POST badges to user for exercise creation
router.post(
    '/creation/:amount',
    ensureAuthenticated,
    catchAsync(badgeController.postExerciseCreationBadge),
);

// POST badges to user for exercise solving
router.post(
    '/solving/:amount',
    ensureAuthenticated,
    catchAsync(badgeController.postExerciseSolvingBadge),
);

// POST badges to user for solution showcasing
router.post(
    '/showcase/:amount',
    ensureAuthenticated,
    catchAsync(badgeController.postShowcaseBadge),
);

// DELETE user badges (mainly for testing)
router.delete('/', ensureAuthenticated, catchAsync(badgeController.deleteBadges));

module.exports = router;
