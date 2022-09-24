const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForumPostSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    postType: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    liked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const ForumPost = mongoose.model('ForumPost', ForumPostSchema);

module.exports = ForumPost;
