const passport = require('passport');
require('dotenv').config();

const passportStrategy = require('../../config/passport');
const { createApp, registerRoutes } = require('../../config/app');
const { connectTestDB, dropDB, dropCollections } = require('../setuptestdb');

const configureTestApp = async () => {
    // Passport auth initialization
    passportStrategy(passport);

    // Initialize app instance
    const app = createApp();

    // Connect to mongodb memory server
    connectTestDB();

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Register routers
    registerRoutes(app);

    return app;
};

const closeTestApp = async () => {
    await dropDB();
};

module.exports = { configureTestApp, closeTestApp };
