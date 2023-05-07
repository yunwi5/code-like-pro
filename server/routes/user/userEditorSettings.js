const express = require('express');
const userEditorSettignsController = require('../../controller/user/userEditorSettingsController');
const { ensureAuthenticated } = require('../../middleware/auth');
const catchAsync = require('../../middleware/catchAsync');
const { validateUserEditorSettingsBody } = require('../../middleware/validateRequest');

const router = express.Router();

router
    .route('/')
    .get(
        ensureAuthenticated,
        catchAsync(userEditorSettignsController.getUserEditorSettings),
    )
    .put(
        ensureAuthenticated,
        validateUserEditorSettingsBody,
        catchAsync(userEditorSettignsController.putUserEditorSettings),
    );

module.exports = router;
