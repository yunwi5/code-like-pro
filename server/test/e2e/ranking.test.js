const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser } = require('./createData');

let app = null;
let user = null;
let cookie = null;

describe('Ranking', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('GET global ranking', () => {
        it('Can get an array of ranking data', async () => {
            // Get global ranking data, no auth required
            const response = await request(app).get('/api/ranking');

            expect(response.statusCode).toBe(200);
            const rankingDataArray = response.body;
            expect(Array.isArray(rankingDataArray));

            const userRank = rankingDataArray.find(
                (userData) => userData._id === user._id,
            );

            // Inspect the current user rank data
            expect(userRank).toBeDefined();
            expect(userRank.creationPoints).toBe(0);
            expect(userRank.solvingPoints).toBe(0);
        });
    });

    describe('GET topic ranking', () => {
        it('Can get an array of topic ranking data', async () => {
            // Get global ranking data, no auth required
            const response = await request(app).get('/api/ranking/topic/Array');

            expect(response.statusCode).toBe(200);
            const rankingDataArray = response.body;
            expect(Array.isArray(rankingDataArray));

            const userRank = rankingDataArray.find(
                (userData) => userData._id === user._id,
            );

            // Inspect the current user rank data
            expect(userRank).toBeDefined();
            expect(userRank.creationPoints).toBe(0);
            expect(userRank.solvingPoints).toBe(0);
        });
    });
});
