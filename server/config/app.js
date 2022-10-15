const express = require('express');
const cors = require('cors');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const errorHandler = require('../middleware/errorHandler');
const keys = require('./keys');
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

// Mongo session store for better session storage (default is in-memory session which is not efficient)
const store = MongoStore.create({
    mongoUrl: keys.MongoURI,
    secret: process.env.SESSION_SECRET || 'thisshouldnotbeasecret',
    touchAfter: 24 * 60 * 60, // lazy update the session, by limiting a period of time
});

store.on('error', function (e) {
    console.log('Session store error', e);
});

const createApp = () => {
    const app = express();

    // handle cors issue from the client
    app.use(
        cors({
            origin: true,
            methods: 'GET,POST,PUT,PATCH,DELETE',
            credentials: true, // IMPORTANT to set to true for session authentication
        }),
    );

    // Allow express to parse JSON
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: false }));

    const sessionConfig = {
        store,
        name: process.env.SESSION_NAME || 'thisshouldnotbeasessionname',
        secret: process.env.SESSION_SECRET || 'thisshouldnotbeasecret',
        resave: false,
        saveUninitialized: true,
        proxy: true, // Required for hosting providers like Heroku & Digital Ocean (regarding X-Forwarded-For)
        cookie: {
            httpOnly: false, // We use JS to access the APIs, so should be false
            secure: process.env.NODE_ENV !== 'production' ? undefined : true, // If true, it only works in https protocal. True in production.
            sameSite: 'none',
            maxAge: 3 * 24 * 60 * 60 * 1000, //user won't have to login for 3 days
        },
    };

    console.log({ sessionConfig });

    // Express Session
    app.use(session(sessionConfig));

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
