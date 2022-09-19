const { Router } = require('express');
const catchAsync = require('../middleware/catchAsync');
const rankingController = require('../controller/rankingController');

const router = Router();

// Get the global ranking points.
router.get('/', catchAsync(rankingController.getUserRankings));

module.exports = router;
