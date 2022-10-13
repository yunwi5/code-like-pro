const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser, createExercise } = require('./createData');

let app = null;
let user = null;
let cookie = null;
// Exercise object where the showcase should belong to.
let exercise = null;

// Necessary props to create a showcase object
const sampleShowcaseProps = {
    code: 'function printMessage(msg) { console.log(msg);};',
    description: 'Simple solution in O(1)',
};

describe('Showcase', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
        exercise = await createExercise(app, cookie);
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('GET showcases', () => {
        it('Can get showcases of an exercise', async () => {
            const response = await request(app)
                .get(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie);

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST showcases', () => {
        it('Can create a showcase', async () => {
            const response = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(sampleShowcaseProps);

            expect(response.statusCode).toBe(201);
            const createdShowcase = response.body;

            // If the showcase object is created by mongoose, _id is defined.
            expect(createdShowcase._id).toBeDefined();
            expect(createdShowcase).toMatchObject(sampleShowcaseProps);
        });

        it('Cannot create a showcase with missing attributes', async () => {
            const response = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send({});

            // This should be 400
            expect(response.statusCode).toBe(400);
        });
    });

    describe('PUT showcases', () => {});

    describe('DELETE showcase', () => {});
});
