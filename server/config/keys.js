const keys = {
    MongoURI: process.env.MONGO_URI,
    ClientBaseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://code-like-pro.vercel.app'
            : 'http://localhost:3000',
    JwtSecret: process.env.JWT_SECRET ?? '',
};

module.exports = keys;
