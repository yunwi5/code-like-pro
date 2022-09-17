const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Language enums available for this app
const { LanguageList } = require('./enums');

const TestCaseSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    expectedOutput: {
        type: String,
        required: true,
    },
    hidden: {
        type: Boolean,
        default: false,
    },
});

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    solutionCode: {
        type: String,
    },
    startingTemplate: { type: String },
    language: {
        type: String,
        enum: LanguageList,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    testCases: {
        type: [TestCaseSchema],
        required: true,
    },
    tags: [{ type: String }],
    courses: [{ type: String }],
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseReport' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    showCases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShowCase' }],
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
