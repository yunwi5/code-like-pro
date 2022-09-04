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
    // Link to the user profile picture. Either link to google profile picture or internal link to the avatar image of the app.
    pictureUrl: { type: String },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
