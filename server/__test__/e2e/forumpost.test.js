const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser } = require('./createData');

let app = null;
let user = null;
let cookie = null;

// Necessary props to create a forum post object
const sampleForumpostProps = {
    name: 'Binary search',
    category: 'Algorithms',
    tags: ['Binary Search', 'Algorithm'],
    postType: 'Showcase',
    content: 'Binary search is an algorithm....',
};

describe('Forumpost', () => {
    beforeAll(async () => {
        app = await configureTestApp();
        const [userReceived, cookieReceived] = await createUser(app);
        user = userReceived;
        cookie = cookieReceived;
    });

    afterAll(async () => {
        await closeTestApp();
    });

    describe('GET forum posts', () => {
        it('Can get forum posts', async () => {
            const response = await request(app)
                .get(`/api/forumPost`)
                .set('cookie', cookie);

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST forum post', () => {
        it('Can create a forum post', async () => {
            const response = await request(app)
                .post(`/api/forumPost`)
                .set('cookie', cookie)
                .send(sampleForumpostProps);

            expect(response.statusCode).toBe(201);
            const createdForumpost = response.body;

            // If the showcase object is created by mongoose, _id is defined.
            expect(createdForumpost._id).toBeDefined();
            expect(createdForumpost).toMatchObject(sampleForumpostProps);
        });

        it('Cannot create a showcase with missing attributes', async () => {
            const response = await request(app)
                .post(`/api/forumPost`)
                .set('cookie', cookie)
                .send({});

            // This should be 400
            expect(response.statusCode).toBe(400);
        });
    });

    describe('PATCH forum post', () => {
        let forumpostId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/forumPost`)
                .set('cookie', cookie)
                .send(sampleForumpostProps);
            forumpostId = postResponse.body._id;
        });

        it('Can update a forum post', async () => {
            const updateResponse = await request(app)
                .patch(`/api/forumPost/${forumpostId}`)
                .set('cookie', cookie)
                .send({ content: 'Modified' });

            // Successful patch request status code
            expect(updateResponse.statusCode).toBe(200);
            // Check if the showcase was patched well with the new description
            expect(updateResponse.body.content).toEqual('Modified');
        });

        it('Cannot update non-existing showcase', async () => {
            const updateResponse = await request(app)
                .patch(`/api/forumPost/non-existing-id`)
                .set('cookie', cookie)
                .send({ content: 'Modified' });

            // Successful patch request status code 400 or 404
            expect([400, 404]).toContain(updateResponse.statusCode);
        });
    });

    describe('DELETE forum post', () => {
        let forumpostId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/forumPost`)
                .set('cookie', cookie)
                .send(sampleForumpostProps);
            forumpostId = postResponse.body._id;
        });

        it('Can delete the forum post', async () => {
            const response = await request(app)
                .delete(`/api/forumPost/${forumpostId}`)
                .set('cookie', cookie);

            expect(response.statusCode).toBe(200);
        });

        it('Cannot delete non-existing forum post', async () => {
            const response = await request(app)
                .delete(`/api/forumPost/non-existing-id`)
                .set('cookie', cookie);

            // 404 not found
            expect(response.statusCode).toBe(404);
        });
    });

    describe('Like forumpost', () => {
        let forumpostId;
        beforeAll(async () => {
            const postResponse = await request(app)
                .post(`/api/forumPost`)
                .set('cookie', cookie)
                .send(sampleForumpostProps);
            forumpostId = postResponse.body._id;
        });

        it('Can like/unlike a showcase', async () => {
            const response = await request(app)
                .post(`/api/forumPost/${forumpostId}/vote`)
                .set('cookie', cookie)
                .send({ type: 'up' });
            expect(response.statusCode).toBe(201);

            const updatedForumpost = response.body;
            // Find the user in liked in forum post
            const foundUserVote = updatedForumpost.votes.find(
                (vote) => vote.user === user._id,
            );

            expect(foundUserVote.user).toEqual(user._id);

            // Unlike forum we just liked
            const response2 = await request(app)
                .delete(`/api/forumPost/${forumpostId}/vote`)
                .set('cookie', cookie);

            const updatedForumpost2 = response2.body;

            const foundIndex = updatedForumpost2.votes.findIndex(
                (vote) => vote.user === user._id,
            );

            // Check user is not in liked list
            expect(foundIndex).toBeLessThan(0);
        });

        it('Cannot like non-existing post', async () => {
            const response = await request(app)
                .post(`/api/forumPost/invalid-id/vote`)
                .set('cookie', cookie)
                .send({ type: 'up' });
            expect(response.statusCode).toBe(404);
        });
    });
});
