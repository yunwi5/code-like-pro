const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseReportSchema = new Schema({
    category: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ExerciseReport = mongoose.model('ExerciseReport', ExerciseReportSchema);

module.exports = ExerciseReport;
