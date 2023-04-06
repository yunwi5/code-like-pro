const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSubmissionSchema = new Schema({
    // Code that the user has written for the submission
    code: {
        type: String,
        required: true,
    },
    correct: {
        type: Boolean,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
    },
    postedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

const UserSubmission = mongoose.model('UserSubmission', UserSubmissionSchema);

module.exports = UserSubmission;
