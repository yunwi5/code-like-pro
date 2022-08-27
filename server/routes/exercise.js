const express = require('express');
const exerciseController = require('../controller/exerciseController');
const catchAsync = require('../middleware/catchAsync');

const router = express.Router();

router.post(
    '/exercise',
    catchAsync(exerciseController.postExercise),
);

router.get(
    '/exercise',
    exerciseController.getExercises,
);

router.get(
    '/exercise/:id',
    exerciseController.getExerciseByID,
);

router.put(
    '/exercise/:id',
    exerciseController.updateExercise,
);

router.delete(
    '/exercise/:id',
    exerciseController.deleteExercise,
);

module.exports = router;