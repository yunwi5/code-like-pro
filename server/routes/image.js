const { Router } = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const catchAsync = require('../middleware/catchAsync');

const imageController = require('../controller/imageController');

const imageRouter = Router();

// Post exercise prompt image
imageRouter.post(
    '/exercise',
    ensureAuthenticated,
    catchAsync(imageController.postExerciseImage),
);

// imageRouter.post('/user')

module.exports = imageRouter;
