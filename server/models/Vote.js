const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['up', 'down'], required: true },
});

const Vote = mongoose.model('Vote', VoteSchema);

// Need to export both VoteSchema and Vote model.
// The VoteSchema is used directly inside the Comment model.
module.exports = { VoteSchema, Vote };
