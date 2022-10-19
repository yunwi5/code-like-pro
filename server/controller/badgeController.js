const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const User = require('../models/User');
const UserSubmission = require('../models/UserSubmission');
const ShowCase = require('../models/ShowCase');
const Badge = require('../models/Badge');

const { BadgeCategory } = require('../models/enums');
const { getRequestedBadgeSpec } = require('../utils/badgeSpec');

// validate if the user already has this badge, so that we don't assign the same badge
// to the user twice
const checkIfUserAlreadyHasBadge = (user, newBadge) => {
    const alreadyHasThisBadge = user.badges.find((badge) => badge.name === newBadge.name);
    return alreadyHasThisBadge;
};

// Create badge for the user and save it.
// Save it only if the user does not have the same badge already
const createUserBadge = async (userId, badgeSpec) => {
    const user = await User.findById(userId).populate('badges');
    const newBadge = new Badge({ ...badgeSpec });

    if (checkIfUserAlreadyHasBadge(user, newBadge)) return null;

    user.badges.push(newBadge);
    const p1 = user.save();
    const p2 = newBadge.save();
    await Promise.all([p1, p2]);

    return newBadge;
};

const postExerciseCreationBadge = async (req, res) => {
    const amount = parseInt(req.params.amount);
    if (isNaN(amount))
        return res.status(400).json({ message: 'Amount should be a number' });

    const createdExercises = await Exercise.find({ author: req.user._id });

    if (createdExercises.length < amount)
        return res.status(403).json({ message: 'You did not create enough exercises' });

    const badgeSpec = getRequestedBadgeSpec(BadgeCategory.CREATION, amount);
    if (badgeSpec == null)
        return res.status(400).json({ message: 'Non existing badge request' });

    // console.log({ badgeSpec });
    try {
        const createdBadge = await createUserBadge(req.user._id, badgeSpec);

        if (createdBadge == null)
            return res.status(200).json({ message: 'You already have this badge' });

        // If everything is valid, return 201 with a newly creatd badge
        res.status(201).json(createdBadge);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(400).json({ message: 'Invalid badge' });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const postExerciseSolvingBadge = async (req, res) => {
    const amount = parseInt(req.params.amount);
    if (isNaN(amount))
        return res.status(400).json({ message: 'Amount should be a number' });

    const userId = req.user._id;
    // Find all submissions that were success.
    const correctSubmissions = await UserSubmission.find({ user: userId, correct: true });

    if (correctSubmissions.length < amount)
        return res.status(403).json({ message: 'You did not solve enough exercises' });

    const badgeSpec = getRequestedBadgeSpec(BadgeCategory.SOLVING, amount);
    if (badgeSpec == null)
        return res.status(400).json({ message: 'Non existing badge request' });

    // console.log({ badgeSpec });
    try {
        const createdBadge = await createUserBadge(userId, badgeSpec);

        if (createdBadge == null)
            return res.status(200).json({ message: 'You already have this badge' });

        // If everything is valid, return 201 with a newly creatd badge
        res.status(201).json(createdBadge);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(400).json({ message: 'Invalid badge' });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const postShowcaseBadge = async (req, res) => {
    const amount = parseInt(req.params.amount);
    if (isNaN(amount))
        return res.status(400).json({ message: 'Amount should be a number' });

    const userId = req.user._id;
    // Find all submissions that were success.
    const userShowcases = await ShowCase.find({ user: userId });

    if (userShowcases.length < amount)
        return res
            .status(403)
            .json({ message: 'You do not have enough showcase solutions!' });

    const badgeSpec = getRequestedBadgeSpec(BadgeCategory.SHOWCASE, amount);
    if (badgeSpec == null)
        return res.status(400).json({ message: 'Non existing badge request' });

    // console.log({ badgeSpec });
    try {
        const createdBadge = await createUserBadge(userId, badgeSpec);

        if (createdBadge == null)
            return res.status(200).json({ message: 'You already have this badge' });

        // If everything is valid, return 201 with a newly creatd badge
        res.status(201).json(createdBadge);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(400).json({ message: 'Invalid badge' });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteBadges = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const badgeIds = user.badges;
        user.badges = [];

        const result = await Badge.deleteMany({ _id: { $in: badgeIds } });
        await user.save();

        res.status(200).json({ message: 'Delete badges success' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    postExerciseCreationBadge,
    postExerciseSolvingBadge,
    postShowcaseBadge,
    deleteBadges,
};
