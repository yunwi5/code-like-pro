const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSubmissionSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    postedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
});

const UserSubmission = mongoose.model('UserSubmission', UserSubmissionSchema);

module.exports = UserSubmission;
