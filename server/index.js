require('colors');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { createApp, registerRoutes } = require('./config/app');
const connectDB = require('./config/db');

const app = createApp();

// Connect to mongodb server
connectDB();

// Register routers
registerRoutes(app);

// Placeholder index route
app.get('/', (_, res) => res.send('Welcome to the index route.'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`App serving on the port ${PORT}`));
