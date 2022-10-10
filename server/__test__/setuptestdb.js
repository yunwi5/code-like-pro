const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// mongo instance
let mongo = null;

const connectTestDB = async () => {
    // Connect to the in-memory mongodb server
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const dropDB = async () => {
    // This function drops the database, closes the Mongoose connection,
    // and stops the Mongo memory server instance.
    if (mongo) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongo.stop();
    }
};

const dropCollections = async () => {
    // It drops all the created Mongoose collections.
    // This will run after each test.
    if (mongo) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.remove();
        }
    }
};

module.exports = { connectTestDB, dropDB, dropCollections };
