const express = require('express');
const exerciseController = require('../../controller/exercise/exerciseController');

const { ensureAuthenticated } = require('../../middleware/auth');
const catchAsync = require('../../middleware/catchAsync');
const {
    validateExerciseBody,
    validateTestCasesBody,
    validateCommentBody,
} = require('../../middleware/validateRequest');

const router = express.Router();

router.get('/', catchAsync(exerciseController.getExercises));

router.post(
    '/',
    ensureAuthenticated,
    validateExerciseBody,
    catchAsync(exerciseController.postExercise),
);

// Put this route above GET /:id route to indicate this route's param is more specific.
router.get('/top', catchAsync(exerciseController.getTopExercises));

router.get('/:id', catchAsync(exerciseController.getExerciseByID));

router.put(
    '/:id',
    ensureAuthenticated,
    validateExerciseBody,
    catchAsync(exerciseController.updateExercise),
);

router.delete('/:id', ensureAuthenticated, catchAsync(exerciseController.deleteExercise));

// Submission history of the exercise from any users.
router.get('/:id/submission', catchAsync(exerciseController.getExerciseSubmissions));

// Merging custom tests from users who attempt the exercise
router.post(
    '/:id/test-merge',
    ensureAuthenticated,
    validateTestCasesBody,
    catchAsync(exerciseController.mergeCustomTests),
);

// User issue report for the exercise
router
    .route('/:id/report')
    .post(ensureAuthenticated, catchAsync(exerciseController.postExerciseReport))
    .get(ensureAuthenticated, catchAsync(exerciseController.getExerciseReports));

// Like functionality
router.post(
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
    .post(
        ensureAuthenticated,
        validateCommentBody,
        catchAsync(exerciseController.postExerciseComment),
    );

// User vote on exercise difficulty
router.post(
    '/:id/difficulty-vote',
    ensureAuthenticated,
    catchAsync(exerciseController.postDifficultyVote),
);

module.exports = router;
