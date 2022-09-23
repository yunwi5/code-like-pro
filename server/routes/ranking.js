const { Router } = require('express');
const catchAsync = require('../middleware/catchAsync');
const rankingController = require('../controller/rankingController');

const router = Router();

// Get the global ranking data array.
router.get('/', catchAsync(rankingController.getUserRankings));

// Topic categories ranking data array.
router.get('/topic/:topic', catchAsync(rankingController.getTopicsUserRankings));

// Course categories ranking data array.
router.get('/course/:course', catchAsync(rankingController.getCoursesUserRankings));

module.exports = router;
