const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser, createExercise } = require('./createData');

let app = null;
let user = null;
let cookie = null;

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

// Sample list of failing test cases to see the app does not add exercise that has failing tests.
const sampleFailTestCases = [
    { code: 'printMessage("Hi")', expectedOutput: 'None', hidden: false },
    { code: 'printMessage("Hello")', expectedOutput: 'None', hidden: true },
    { code: 'printMessage("Test")', expectedOutput: 'None', hidden: false },
];

describe('Exercises', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('GET exercises', () => {
        it('Can get exercises', async () => {
            await request(app).get('/api/exercise').expect(200);
        });
    });

    describe('POST exercise', () => {
        it('Can create an exercise that is valid', async () => {
            const response = await request(app)
                .post('/api/exercise')
                .set('cookie', cookie)
                .send(sampleExercise);

            // Create success status 201
            expect(response.statusCode).toBe(201);

            const createdExercise = response.body;

            // Test its attributes
            expect(createdExercise._id).toBeDefined(); // ID should be defined if an exercise is created by mongoose
            expect(createdExercise.name).toEqual(sampleExercise.name);
        });

        it('Cannot create exercise with missing attributes', async () => {
            const response = await request(app)
                .post('/api/exercise')
                .set('cookie', cookie)
                .send({});

            // It should be 400 bad request or 422
            expect(response.statusCode).toBe(500);
        });

        it('Cannot create an exercise if there are less than 3 test cases.', async () => {
            // The API needs to implement this aspect.
        });

        it('Cannot create an exercise if there are any failing test cases.', async () => {
            // Insert failing test cases to see if the app rejects this exercise.
            const response = await request(app)
                .post('/api/exercise')
                .set('cookie', cookie)
                .send({ ...sampleExercise, testCases: sampleFailTestCases });

            // If any test cases fail, return 400 Bad Response.
            expect(response.status).toBe(400);
        });
    });

    describe('PUT an exercise', () => {
        it('Can update an exercise', async () => {
            const createdExercise = await createExercise(app, cookie);
            // Insert an updated attribute to test update
            const updatedExercise = { ...sampleExercise, name: 'Updated' };

            const response = await request(app)
                .put(`/api/exercise/${createdExercise._id}`)
                .set('cookie', cookie)
                .send(updatedExercise);

            expect(response.statusCode).toBe(200);
            // Test if the name attribute is updated successfully
            expect(response.body.name).toEqual(updatedExercise.name);
        });

        it('Cannot update if there are missing attributes', async () => {
            // If necessary attributes like test cases are missing, it should not update.
            // This functionality is not ideally implemented at the moment.
            // The server should return 400 if they are missing, but currently return 500 internal server error.
        });

        it('Cannot update if there are failing tests', async () => {
            // If any test cases fail, do not update.
        });
    });

    describe('DELETE an exercise', () => {
        it('Can delete an exercise', async () => {
            // Create a sample exercise with the createExercise() utility function
            // Send DELETE request to delete this exercise
            // Test the status code is 200 OK
        });

        it('Cannot delete non-existing exercise', async () => {
            // If invalid exercise id is passed as a param, return 404.
            await request(app)
                .delete('/api/exercise/none')
                .set('cookie', cookie)
                .expect(404);
        });

        it('When deleting exercise, delete its comments and showcases as well', async () => {
            // This cleanup functionality has not been implemented.
            // Need to implement it and test it through this test function.
        });
    });
});
