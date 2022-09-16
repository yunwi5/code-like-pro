const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const DB_NAME = 'code-like-pro';
const MongodbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.7z3ly69.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const keys = {
    // Connect to the cloud database if the password env variale exists, otherwise connect to local mongodb.
    MongoURI: MONGO_PASSWORD ? MongodbURI : 'mongodb://localhost:27017/code-like-pro', // connection string to local mongodb server
    ClientBaseURL: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
};

module.exports = keys;
