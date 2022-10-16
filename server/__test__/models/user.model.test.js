const mongoose = require('mongoose');
const { connectTestDB, dropDB, dropCollections } = require('../setuptestdb');
const User = require('../../models/User');

describe('User model test', () => {
    beforeAll(async () => {
        await connectTestDB();
    });

    afterAll(async () => {
        await dropDB();
    });

    afterEach(async () => {
        await dropCollections();
    });

    describe('User model', () => {
        it('should create a new user successfully', async () => {
            const user = {
                email: 'test@test.com',
                name: 'tester',
                description: 'test',
                password: 'test2test2test',
            };
            const newUser = await User(user);
            await newUser.save();
            expect(newUser._id).toBeDefined();
            expect(newUser.name).toBe(user.name);
            // createdAt attribute is automatically created when the user is inserted.
            expect(newUser.createdAt).toBeDefined();
        });

        it('should fail to create user without required fields', async () => {
            // user is missing name and password which are required.
            const invalidUser = {
                email: 'test@test.com',
            };
            try {
                const newUser = new User(invalidUser);
                await newUser.save();
            } catch (error) {
                expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
            }
        });
    });
});
