const express = require('express');
const cors = require('cors');

const errorHandler = require('../middleware/errorHandler');
const router = require('../routes/index');
const authRouter = require('../routes/auth/auth');
const exerciseRouter = require('../routes/exercise/exercise');
const userSubmissionRouter = require('../routes/user/userSubmission');
const userEditorSettingsRouter = require('../routes/user/userEditorSettings');
const commentRouter = require('../routes/comment');
const userRouter = require('../routes/user/user');
const showCaseRouter = require('../routes/showCase');
const exerciseReportRouter = require('../routes/exercise/exerciseReport');
const rankingRouter = require('../routes/ranking');
const imageRouter = require('../routes/image');
const forumPostRouter = require('../routes/forumPost');
const badgeRouter = require('../routes/badge');

const createApp = () => {
    const app = express();

    // handle cors issue from the client
    app.use(
        cors({
            origin: true,
            methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
        }),
    );

    // Allow express to parse JSON
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: false }));

    // Register default error handler
    app.use(errorHandler);

    return app;
};

const registerRoutes = (app) => {
    app.use('/api', router);
    app.use('/api/auth', authRouter);

    app.use('/api/exercise', exerciseRouter);
    app.use('/api/submission', userSubmissionRouter);
    app.use('/api/editorSettings', userEditorSettingsRouter);
    app.use('/api/user', userRouter);
    app.use('/api/showcase', showCaseRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/report', exerciseReportRouter);
    app.use('/api/ranking', rankingRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/forumPost', forumPostRouter);
    app.use('/api/badge', badgeRouter);
};

module.exports = { createApp, registerRoutes };
