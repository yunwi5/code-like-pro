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

// Submission history of the exercise from any users.
router.get('/:id/submission', catchAsync(exerciseController.getExerciseSubmissions));

// User issue report for the exercise
router
    .route('/:id/report')
    .post(ensureAuthenticated, catchAsync(exerciseController.postExerciseReport))
    .get(ensureAuthenticated, catchAsync(exerciseController.getExerciseReports));

// Like/favorite toggling functionality
router.get(
    '/:id/like',
    ensureAuthenticated,
    catchAsync(exerciseController.toggleLikeExercise),
);

// Routes for handling user showcases for the exercise of the param id.
router
    .route('/:id/showcase')
    .post(ensureAuthenticated, catchAsync(exerciseController.postExerciseShowcase))
    .get(ensureAuthenticated, catchAsync(exerciseController.getExerciseShowcases));

// Routes for handling comments (discussion forum) for the exercise of the param id.
router
    .route('/:id/comment')
    // Route for getting all the comments of the exercise of the param id.
    .get(ensureAuthenticated, catchAsync(exerciseController.getExerciseComments))
    // Route for adding a comment to the exercise of the param id.
    .post(ensureAuthenticated, catchAsync(exerciseController.postExerciseComment));

module.exports = router;
