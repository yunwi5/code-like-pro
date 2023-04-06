const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Badge'); // To make sure the badge model is registered by importing it

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
    // User description such as About Me section on the profile.
    description: { type: String, default: '' },
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
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
