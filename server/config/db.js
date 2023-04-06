const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(keys.MongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
