const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema({
   testcode: {
        type: String,
        required: true,
   },
   expectedOutput: {
        type: String,
        required: true,
   },
   hidden: {
        type: Boolean,
        default: () => False
   }
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
    level: {
        type: String,
        required: true,
    },
    solution_code: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    liked:
        [{type: mongoose.Schema.Types.ObjectID, ref: 'User'}],
    test_cases: {
        type: [TestCaseSchema],
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    submissions: 
        [{type: mongoose.Schema.Types.ObjectID, ref: 'UserSubmission'}],
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
