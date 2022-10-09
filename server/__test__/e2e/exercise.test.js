const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');

let app = null;

describe('Exercises', () => {
    beforeAll(async () => {
        app = await configureTestApp();
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('Get exercises', () => {
        it('Can get exercises', async () => {
            await request(app).get('/api/exercise').expect(200);
        });
    });
});
