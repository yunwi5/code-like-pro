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
    solutionCode: {
        type: String,
    },
    language: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectID, ref: "User"
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    liked:
        [{type: mongoose.Schema.Types.ObjectID, ref: 'User'}],
    testCases: {
        type: [TestCaseSchema],
        required: true,
    },
    submissions: 
        [{type: mongoose.Schema.Types.ObjectID, ref: 'UserSubmission'}],
    tags:
        [{type: String}],
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;
