const passport = require('passport');
require('dotenv').config();

const passportStrategy = require('../../config/passport');
const { createApp, registerRoutes } = require('../../config/app');
const { connectTestDB, dropDB } = require('../setuptestdb');

// Function that runs at the beginning of the e2e tests.
// Always put this in beforeAll() callback function.
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

// Function that runs after running all e2e tests.
// Always put this in afterAll() callback function.
const closeTestApp = async () => {
    await dropDB();
};

module.exports = { configureTestApp, closeTestApp };
