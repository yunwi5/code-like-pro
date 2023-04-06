const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const DB_NAME = 'code-like-pro';
const MongodbURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.7z3ly69.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const keys = {
    // Connect to the cloud database if the password env variale exists, otherwise connect to local mongodb.
    MongoURI:
        MONGO_USERNAME && MONGO_PASSWORD
            ? MongodbURI
            : 'mongodb://localhost:27017/code-like-pro',
    ClientBaseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://code-like-pro.vercel.app'
            : 'http://localhost:3000',
    JwtSecret: process.env.JWT_SECRET ?? '',
};

module.exports = keys;
