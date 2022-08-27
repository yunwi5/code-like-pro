const express = require('express');
const exerciseController = require('../controller/exerciseController');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

router.post('/', ensureAuthenticated, catchAsync(exerciseController.postExercise));

router.get('/', exerciseController.getExercises);

router.get('/:id', exerciseController.getExerciseByID);

router.put('/:id', ensureAuthenticated, exerciseController.updateExercise);

router.delete('/:id', ensureAuthenticated, exerciseController.deleteExercise);

module.exports = router;
