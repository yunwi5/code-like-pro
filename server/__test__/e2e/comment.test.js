const request = require('supertest');
const { configureTestApp, closeTestApp } = require('./config');
const { createUser, createExercise } = require('./createData');

let app = null;
let user = null;
let cookie = null;
// Exercise object where the showcase should belong to.
let exercise = null;

// Necessary prop to create a comment object
const sampleCommentProps = {
    text: 'Example comment text',
};

async function createComment() {
    const response = await request(app)
        .post(`/api/exercise/${exercise._id}/comment`)
        .set('cookie', cookie)
        .send(sampleCommentProps);
    return response.body;
}

describe('Comment', () => {
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

    describe('POST exercise comment', () => {
        it('Can create exercise comment', async () => {
            // create a comment with valid props
            const response = await request(app)
                .post(`/api/exercise/${exercise._id}/comment`)
                .set('cookie', cookie)
                .send(sampleCommentProps);

            expect(response.statusCode).toBe(201);
            // If the comment was created, _id should be there
            expect(response.body._id).toBeDefined();
            expect(response.body).toMatchObject(sampleCommentProps);
        });

        it('Cannot create comment with missing attributes', async () => {
            // post comment with empty object, missing text.
            const response = await request(app)
                .post(`/api/exercise/${exercise._id}/comment`)
                .set('cookie', cookie)
                .send({});

            expect(response.statusCode).toBe(400);
        });
    });

    describe('GET exercise comments', () => {
        it('Cannot get comments of non-existing exercise', async () => {
            const response = await request(app)
                .get('/api/exercise/non-existing-id/comment')
                .set('cookie', cookie);

            expect(response.statusCode).toBe(404);
        });

        it('Can get exercise comment', async () => {
            // create a sample comment
            const comment = await createComment();

            const response = await request(app)
                .get(`/api/exercise/${exercise._id}/comment`)
                .set('cookie', cookie);

            expect(response.statusCode).toBe(200);
            const body = response.body;

            // check the response data is an array of comments
            expect(Array.isArray(body)).toBe(true);

            // find the comment we just posted to check if it exists under this exercise
            const postedComment = body.find((com) => com._id === comment._id);
            expect(postedComment).toMatchObject(sampleCommentProps);
            expect(postedComment.user._id).toEqual(user._id);
        });
    });

    describe('PATCH comments', () => {
        const updatedProps = { text: 'Just updated' };

        it('Can update the comment', async () => {
            // create a sample comment
            const comment = await createComment();

            const response = await request(app)
                .patch(`/api/comment/${comment._id}`)
                .set('Cookie', cookie)
                .send(updatedProps);

            expect(response.statusCode).toBe(200);
            expect(response.body).toMatchObject(updatedProps);
        });
    });

    describe('DELETE comment', () => {
        it('Can delete the comment', async () => {
            // create a sample comment
            const comment = await createComment();

            const response = await request(app)
                .delete(`/api/comment/${comment._id}`)
                .set('Cookie', cookie);

            expect(response.statusCode).toBe(200);
        });

        it('Cannot delete non-existing comment', async () => {
            const response = await request(app)
                .delete(`/api/comment/non-existing-id`)
                .set('Cookie', cookie);

            expect(response.statusCode).toBe(404);
        });
    });

    const sampleReply = { text: 'Reply comment' };

    describe('POST reply comment', () => {
        it('Can create reply comment', async () => {
            // create a sample comment
            const comment = await createComment();

            const response = await request(app)
                .post(`/api/comment/${comment._id}/reply`)
                .set('Cookie', cookie)
                .send(sampleReply);

            expect(response.statusCode).toBe(201);
            // If the reply was created, _id should be defined.
            expect(response.body._id).toBeDefined();
            expect(response.body).toMatchObject(sampleReply);
        });

        it('Cannot create reply for non-existing comment', async () => {
            const response = await request(app)
                .post(`/api/comment/non-existing-id/reply`)
                .set('Cookie', cookie)
                .send(sampleReply);

            expect(response.statusCode).toBe(404);
        });
    });

    describe('GET reply comment', () => {
        it('Can get reply-comments', async () => {
            // create a sample comment
            const comment = await createComment();

            const response = await request(app)
                .get(`/api/comment/${comment._id}/reply`)
                .set('Cookie', cookie)
                .send(sampleReply);

            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('Vote comment', () => {
        it('Can vote an existing comment', async () => {
            // create a sample comment
            const comment = await createComment();

            // Upvote the sample commment
            const response = await request(app)
                .post(`/api/comment/${comment._id}/vote`)
                .set('Cookie', cookie)
                .send({ type: 'up' });

            expect(response.statusCode).toBe(201);
            const updatedComment = response.body;

            // Updated comment contains the upvote we just posted
            const upvote = updatedComment.votes.find((vote) => vote.type === 'up');
            expect(upvote).toBeDefined();
        });

        it('Cannot post vote of invalid type', async () => {
            // create a sample comment
            const comment = await createComment();

            // Post invalid vote type
            const response = await request(app)
                .post(`/api/comment/${comment._id}/vote`)
                .set('Cookie', cookie)
                .send({ type: 'no-way' });

            expect(response.statusCode).toBe(400);
        });

        it('Can cancel/delete the vote', async () => {
            // create a sample comment
            const comment = await createComment();

            // Upvote the sample commment
            await request(app)
                .post(`/api/comment/${comment._id}/vote`)
                .set('Cookie', cookie)
                .send({ type: 'up' });

            const response = await request(app)
                .delete(`/api/comment/${comment._id}/vote`)
                .set('Cookie', cookie);

            // Delete should be OK
            expect(response.statusCode).toBe(200);

            // Endpoint returns updated comment
            const updatedComment = response.body;

            // There should be no votes after deleting the vote
            expect(updatedComment.votes.length).toBe(0);
        });
    });
});
