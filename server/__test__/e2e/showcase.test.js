// const jest = require('jest');
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

    beforeEach(function () {
        jest.setTimeout(30000);
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

        it('Posting showcase to non-existing exercise does nothing', async () => {
            // Invalid exercise id
            const response = await request(app)
                .post(`/api/exercise/invalid-id/showcase`)
                .set('cookie', cookie)
                .send({});

            // This should be 400
            expect(response.statusCode).toBe(400);
        });

        it('Making the showcase again by the same user, replaces the existing one', async () => {
            const _ = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(sampleShowcaseProps);

            const modifiedShowcaseProps = {
                ...sampleShowcaseProps,
                description: 'changed',
            };
            const response2 = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(modifiedShowcaseProps);

            // Posting the showcase again, does not insert any showcase of the user again
            // Hence, return 200 not 201, as it did not create new thing.
            expect(response2.statusCode).toBe(200);

            const getResponse = await request(app)
                .get(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie);

            const showcases = getResponse.body;
            // Get current user showcases
            const userShowcases = showcases.filter((sc) => sc.user._id === user._id);

            // Confirm there is only one showcase from this user
            expect(userShowcases.length).toBe(1);
            // Confirm the user showcase matches the latest submission by the user.
            // Check if it was modified successfully.
            expect(userShowcases[0]).toMatchObject(modifiedShowcaseProps);
        });
    });

    describe('PATCH showcases', () => {
        let showcaseId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(sampleShowcaseProps);
            showcaseId = postResponse.body._id;
        });

        it('Can update a showcase', async () => {
            const updateResponse = await request(app)
                .patch(`/api/showcase/${showcaseId}`)
                .set('cookie', cookie)
                .send({ description: 'Modified' });

            // Successful patch request status code
            expect(updateResponse.statusCode).toBe(200);
            // Check if the showcase was patched well with the new description
            expect(updateResponse.body.description).toEqual('Modified');
        });

        it('Cannot update non-existing showcase', async () => {
            const updateResponse = await request(app)
                .patch(`/api/showcase/non-existing-showcase-id`)
                .set('cookie', cookie)
                .send({ description: 'Modified' });

            // Successful patch request status code 400 or 404
            expect([400, 404]).toContain(updateResponse.statusCode);
        });
    });

    describe('DELETE showcase', () => {
        let showcaseId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(sampleShowcaseProps);
            showcaseId = postResponse.body._id;
        });

        it('Can delete the showcase', async () => {
            const response = await request(app)
                .delete(`/api/showcase/${showcaseId}`)
                .set('cookie', cookie);

            expect(response.statusCode).toBe(200);
        });

        it('Cannot delete non-existing showcase', async () => {
            const response = await request(app)
                .delete(`/api/showcase/non-existing-id`)
                .set('cookie', cookie);

            // 404 not found
            expect(response.statusCode).toBe(404);
        });
    });

    describe('Vote showcase', () => {
        let showcaseId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/exercise/${exercise._id}/showcase`)
                .set('cookie', cookie)
                .send(sampleShowcaseProps);
            showcaseId = postResponse.body._id;
        });

        it('Can vote a showcase', async () => {
            const response = await request(app)
                .post(`/api/showcase/${showcaseId}/vote`)
                .set('cookie', cookie)
                .send({ type: 'up' });
            expect(response.statusCode).toBe(201);

            const updatedShowcase = response.body;
            // Find the newly inserted vote from this user.
            const foundVote = updatedShowcase.votes.find(
                (vote) => vote.user === user._id,
            );

            // The vote by the user should be defined, and its type is 'up'
            expect(foundVote).toMatchObject({ type: 'up' });
        });

        it('Cannot vote with a wrong type', async () => {
            // post a vote with invalid type neither 'up' nor 'down'
            const response = await request(app)
                .post(`/api/showcase/${showcaseId}/vote`)
                .set('cookie', cookie)
                .send({ type: 'invalid-type' });

            expect(response.statusCode).toBe(400);
        });

        it('Cannot vote non-existing showcase', async () => {
            const response = await request(app)
                .post(`/api/showcase/invalid-id/vote`)
                .set('cookie', cookie)
                .send({ type: 'up' });
            expect(response.statusCode).toBe(404);
        });

        it('Can delete/cancel the vote', async () => {
            // Make an upvote which is to be deleted right after.
            await request(app)
                .post(`/api/showcase/${showcaseId}/vote`)
                .set('cookie', cookie)
                .send({ type: 'up' });

            // Delete the vote we just inserted.
            const deletedResponse = await request(app)
                .delete(`/api/showcase/${showcaseId}/vote`)
                .set('cookie', cookie);

            // Check the delete request is OK 200
            expect(deletedResponse.statusCode).toBe(200);
        });
    });
});
