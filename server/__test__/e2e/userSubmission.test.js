const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser } = require('./createData');

let app = null;
let user = null;
let cookie = null;

const sampleTestCasesBody = {
    language: 'nodejs', // javascript exercise
    code: 'function printMessage(msg) { console.log(msg);};',
    testCases: [
        { code: 'printMessage("Hi")', expectedOutput: 'Hi', hidden: false },
        { code: 'printMessage("Hello")', expectedOutput: 'Hello', hidden: true },
        { code: 'printMessage("Test")', expectedOutput: 'Test', hidden: false },
    ],
};

describe('User submission', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('POST run test cases', () => {
        it('Can run test cases', async () => {
            // Run code would not require authentication
            const response = await request(app)
                .post('/api/submission/run')
                .send(sampleTestCasesBody);

            // Should be 200 OK
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);

            // Every test testcase should be correct
            const correctness = response.body.every((testOutput) => testOutput.correct);
            expect(correctness).toBe(true);

            // Inspect the first test case output and its attributes
            const testOutput = response.body[0];
            expect(testOutput.actualOutput).toEqual(testOutput.expectedOutput);
            expect(testOutput.error).toBeFalsy();
        });

        it('cannot run test cases with missing attributes', async () => {
            const response = await request(app)
                .post('/api/submission/run')
                .send({ language: 'nodejs' });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('POST user submission', () => {});
});
