const express = require('express');
const exerciseController = require('../controller/exerciseController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

router.post('/', ensureAuthenticated, catchAsync(exerciseController.postExercise));

router.get('/', catchAsync(exerciseController.getExercises));

router.get('/:id', catchAsync(exerciseController.getExerciseByID));

router.put('/:id', ensureAuthenticated, catchAsync(exerciseController.updateExercise));

router.delete('/:id', ensureAuthenticated, catchAsync(exerciseController.deleteExercise));

// User issue report for the exercise
router.post('/:id/report', ensureAuthenticated, catchAsync(exerciseController.reportExercise));

module.exports = router;
