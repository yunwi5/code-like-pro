const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DifficultyList } = require('./enums');

const DifficultyVoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: DifficultyList, required: true },
});

const DifficultyVote = mongoose.model('DifficultyVote', DifficultyVoteSchema);

module.exports = { DifficultyVote, DifficultyVoteSchema };
