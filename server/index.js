// External modules
require('colors'); // colors to highlight console output like db connection
const passport = require('passport');
require('dotenv').config();

// Internal modules
const createApp = require('./config/app');
const connectDB = require('./config/db');
const passportStrategy = require('./config/passport');
const router = require('./routes/index');
const authRouter = require('./routes/auth/auth-local');

const app = createApp();

// Connect to mongodb server
connectDB();

// Passport auth initialization
passportStrategy(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Register routers
// IMPORTANT: register routers after the passport configuration (otherwise session is not set up correctly)
app.use('/api', router);
app.use('/api/auth', authRouter);

// Placeholder index route
app.get('/', (req, res) => res.send('Welcome to the index route.'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App serving on the port ${PORT}`));
