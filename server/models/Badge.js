const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Each user stores list of badges (badge _id's) that they were awarded. 
Hence, no need to store the reference to the user. */
const BadgeSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Creation', 'Solving', 'Showcase'], required: true },
    description: { type: String, default: '' },
    rarity: { type: String, enum: ['N', 'R', 'SR', 'UR'], required: true },
    awardedAt: { type: Date, default: () => Date.now(), immutable: true },
});

const Badge = mongoose.model('Badge', BadgeSchema);

module.exports = Badge;
