const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { VoteSchema } = require('./Vote');

const ShowCaseSchema = new Schema({
    code: { type: String, required: true },
    description: { type: String, default: '' },
    postedAt: { type: Date, default: () => Date.now() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    votes: [VoteSchema],
});

const ShowCase = mongoose.model('ShowCase', ShowCaseSchema);

module.exports = ShowCase;
