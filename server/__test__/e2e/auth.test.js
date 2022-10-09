const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');

let app = null;

const userData = {
    name: 'tester',
    email: 'test@test.com',
    password: 'test2test2test2',
};

describe('Authentication', () => {
    beforeAll(async () => {
        app = await configureTestApp();
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('Register the user', () => {
        it('Can register the user', async () => {
            const response = await request(app).post('/api/auth/sign-up').send(userData);

            expect(response.statusCode).toBe(201);
            expect(response.body).toMatchObject({
                name: userData.name,
                email: userData.email,
            }); // true;
            // Should not send password back to the user
            expect(response.body.password).toBeUndefined();
        });

        it('Cannot register if required user attributes are missing', async () => {
            const response = await request(app).post('/api/auth/sign-up').send({});
            expect(response.statusCode).toBe(400);

            const emailMissing = request(app)
                .post('/api/auth/sign-up')
                .send({ name: 'hi', password: 'e901jfkida9dde' });
            const nameMissing = request(app)
                .post('/api/auth/sign-up')
                .send({ email: userData.email, password: userData.password });
            const passwordMissing = request(app)
                .post('/api/auth/sign-up')
                .send({ email: userData.email, name: userData.name });

            const [res1, res2, res3] = await Promise.all([
                emailMissing,
                nameMissing,
                passwordMissing,
            ]);
            expect(res1.statusCode).toBe(400);
            expect(res2.statusCode).toBe(400);
            expect(res3.statusCode).toBe(400);
        });

        it('Cannot register if the password is less than 7 characters', async () => {
            const response = await request(app)
                .post('/api/auth/sign-up')
                .send({ ...userData, password: 'hi' });

            expect(response.statusCode).toBe(400);
        });
    });

    describe('Login the user', () => {
        it('Can login the user', async () => {
            const response = await request(app).post('/api/auth/login').send(userData);
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        });

        it('Cannot login with missing attributes', async () => {
            const response = await request(app).post('/api/auth/login').send({});
            // If the required attributes are missing, it returns 400 even before reaching passport authentication.
            expect(response.statusCode).toBe(400);
        });

        it('Cannot login with wrong password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: userData.email, password: 'wrongpassword' });

            expect(response.statusCode).toBe(401);
            expect(response.body).toEqual({});
        });

        it('Does not login non-existing user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'none@none.com', password: 'none98989' });

            expect(response.statusCode).toBe(401);
        });
    });
});
