const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser, createExercise } = require('./createData');

let app = null;
let user = null;
let cookie = null;

describe('Users', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('GET users', () => {
        it('Can get user by id', async () => {
            const userId = user._id;

            const response = await request(app).get(`/api/user/${userId}`);
            expect(response.body._id).toBe(userId);
            expect(response.statusCode).toBe(200);
        });

        it('Can get user details by id', async () => {
            // Post exercise and like to check all details returned
            const createdExercise = await createExercise(app, cookie);
            const exerciseId = createdExercise._id;
            await request(app)
                .post(`/api/exercise/${exerciseId}/like`)
                .set('cookie', cookie);
            const userId = user._id;
            const detailResponse = await request(app)
                .get(`/api/user/${userId}/detail`)
                .set('cookie', cookie);

            expect(detailResponse.statusCode).toBe(200);
            expect(detailResponse.body.liked[0]._id).toBe(exerciseId);
            expect(detailResponse.body.exercises[0]._id).toBe(exerciseId);
        });

        it('Cant get user details without authentication', async () => {
            const response = await request(app).get(`/api/user/${user._id}/detail`);
            expect(response.statusCode).toBe(401);
        });
    });

    describe('UPDATE users', () => {
        it('Cant update user without authentication', async () => {
            const updateResponse = await request(app)
                .patch(`/api/user/${user._id}`)
                .send({ name: 'Modified' });

            expect(updateResponse.statusCode).toBe(404);
        });

        it('Can update user', async () => {
            const updateResponse = await request(app)
                .patch(`/api/user`)
                .set('cookie', cookie)
                .send({ name: 'Modified' });

            expect(updateResponse.statusCode).toBe(200);
            expect(updateResponse.body.name).toBe('Modified');
        });
    });
});
