const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: { type: String, required: true },
    // User attribute is not null, if the image is a profile image.
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // Exercise attribute is not null, if the image is a exercise prompt image.
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
    },
});

module.exports = mongoose.model('Image', ImageSchema);
