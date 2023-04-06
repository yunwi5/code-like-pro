const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/*
Set up in-memory mongodb server for the testing server.
Since it is for testing, the database should not affect the real database that actual users use.

This file contains functions that create mongodb memory server, and drop the database 
after testing everything to clean up the memory database before the next testing.
*/

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
