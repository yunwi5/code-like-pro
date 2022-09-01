const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        minLength: 7,
        lowercase: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    // submissions: [{type: mongoose.Schema.Types.ObjectID, ref: "UserSubmission"}],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
