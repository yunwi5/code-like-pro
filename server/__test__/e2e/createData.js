const request = require('supertest');

/*
Create any sample test data that needs to be created for further testing.

When testing exercise APIs, the user needs to be registered and logged in.
Use createUser() function to create a sample user and make the user logged in.
Then, return created user and the cookie so that further requests can use them for authorization.

The createExercise() function does the similar thing. It creates a placeholder or sample exercise,
so that we can test PUT exercise and DELETE exercise functionalities without writing the same code
for creating a new exercise every time.

This file can contain any other functions that create sample data for the testing purpose.
*/

const sampleUser = {
    name: 'tester',
    email: 'test@test.com',
    password: 'test2test2test2',
};

// Register and login the user with the cookie session
const createUser = async (app) => {
    await request(app).post('/api/auth/sign-up').send(sampleUser);
    const loginResponse = await request(app).post('/api/auth/login').send(sampleUser);
    let cookie = loginResponse.headers['set-cookie'];
    // Return a created user, and the session cookie for further usage in other requests.
    return [loginResponse.body, cookie];
};

// Example exercise for testing
const sampleExercise = {
    name: 'Print message',
    prompt: 'prompt',
    difficulty: 'Easy',
    solutionCode: 'function printMessage(msg) { console.log(msg);};',
    testCases: [
        { code: 'printMessage("Hi")', expectedOutput: 'Hi', hidden: false },
        { code: 'printMessage("Hello")', expectedOutput: 'Hello', hidden: true },
        { code: 'printMessage("Test")', expectedOutput: 'Test', hidden: false },
    ],
    language: 'nodejs', // javascript exercise
    tags: ['print'],
};

// Create a sample exercise
const createExercise = async (app, cookie) => {
    const response = await request(app)
        .post('/api/exercise')
        .set('cookie', cookie)
        .send(sampleExercise);

    // Return created exercise
    return response.body;
};

// Necessary props to create a showcase object
const sampleShowcaseProps = {
    code: 'function printMessage(msg) { console.log(msg);};',
    description: 'Simple solution in O(1)',
};

// Create a sample showcase for further testing
const createShowcase = async (app, cookie, exercise) => {
    const response = await request(app)
        .post(`/api/exercise/${exercise._id}/showcase`)
        .set('cookie', cookie)
        .send(sampleShowcaseProps);

    // Return created showcase
    return response.body;
};

module.exports = { createUser, createExercise, createShowcase };
