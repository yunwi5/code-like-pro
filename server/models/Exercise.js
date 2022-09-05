const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { LanguageEnum } = require('./enums');

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
        enum: LanguageEnum,
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
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseReport' }],
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
