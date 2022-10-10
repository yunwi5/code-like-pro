const express = require('express');
const cors = require('cors');
const session = require('express-session');
const keys = require('./keys');
const errorHandler = require('../middleware/errorHandler');

const router = require('../routes/index');
const authRouter = require('../routes/auth/auth');
const authGoogleRouter = require('../routes/auth/authGoogle');
const exerciseRouter = require('../routes/exercise');
const userSubmissionRouter = require('../routes/userSubmission');
const commentRouter = require('../routes/comment');
const userRouter = require('../routes/user');
const showCaseRouter = require('../routes/showCase');
const exerciseReportRouter = require('../routes/exerciseReport');
const rankingRouter = require('../routes/ranking');
const imageRouter = require('../routes/image');
const forumPostRouter = require('../routes/forumPost');

const createApp = () => {
    const app = express();

    // handle cors issue from client
    app.use(
        cors({
            origin: keys.ClientBaseURL,
            methods: 'GET,POST,PUT,PATCH,DELETE',
            credentials: true, // IMPORTANT to set to true
        }),
    );

    // Allow express to parse JSON
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: false }));

    // Express Session
    app.use(
        session({
            name: 'session',
            secret: 'secretcat',
            resave: false,
            saveUninitialized: true,
        }),
    );

    // Register default error handler
    app.use(errorHandler);

    return app;
};

const registerRoutes = (app) => {
    // register all the routers of this app
    app.use('/api', router);
    app.use('/api/auth', authRouter);
    app.use('/api/auth/google', authGoogleRouter);

    app.use('/api/exercise', exerciseRouter);
    app.use('/api/submission', userSubmissionRouter);
    app.use('/api/user', userRouter);
    app.use('/api/showcase', showCaseRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/report', exerciseReportRouter);
    app.use('/api/ranking', rankingRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/forumPost', forumPostRouter);
};

module.exports = { createApp, registerRoutes };
