const keys = {
    MongoURI: process.env.MongoURI || 'mongodb://localhost:27017/code-like-pro', // connection string to local mongodb server
    ClientBaseURL: process.env.ClientBaseURL || 'http://localhost:3000',
};

module.exports = keys;
