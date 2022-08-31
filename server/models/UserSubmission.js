const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { LanguageEnum } = require('./enums');

const UserSubmissionSchema = new Schema({
    // Code that the user has written for the submission
    code: {
        type: String,
        required: true,
    },
    correct: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String,
        enum: LanguageEnum,
    },
    postedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const UserSubmission = mongoose.model('UserSubmission', UserSubmissionSchema);

module.exports = UserSubmission;
