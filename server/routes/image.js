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

// Post user (custom) profile image
imageRouter.post('/user', ensureAuthenticated, catchAsync(imageController.postUserImage));

// Delete image by url. Req body: {url: string}
// DELETE request does not have body, so use POST request instead to perform delete action.
imageRouter.post('/', ensureAuthenticated, catchAsync(imageController.deleteImageByUrl));

module.exports = imageRouter;
