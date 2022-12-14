const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VoteSchema } = require('./Vote');

const ForumPostSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    postType: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    votes: [VoteSchema],
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);

module.exports = ForumPost;
