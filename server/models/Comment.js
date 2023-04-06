const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VoteSchema } = require('./Vote');

const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // postedAt attribute can be changed, when the user fixes the comment.
    postedAt: { type: Date, default: () => Date.now() },
    replyTo: { type: Schema.Types.ObjectId, ref: 'Comment' },
    votes: [VoteSchema],
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
