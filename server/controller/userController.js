const UserSubmission = require('../models/UserSubmission');
const User = require('../models/User');
const Exercise = require('../models/Exercise');

const getUserByID = async (req, res) => {
    let user;
    try {
        // populate author field with author name
        user = await User.findById(req.params.id)
            .populate({ path: 'liked', populate: { path: 'author', select: 'name' } })
            .lean();
    } catch (err) {
        console.log(err.message);
    }

    if (user != null) {
        const userSubmissions = await UserSubmission.find({ user: req.params.id }).populate(
            'exercise',
        );
        const userExercises = await Exercise.find({ author: req.params.id });

        user.submissions = userSubmissions;
        user.exercises = userExercises;

        res.status(200).json(user);
    } else {
        res.status(404).json(`User ${req.params.id} not found`);
    }
};

const updateUser = async (req, res) => {
    const updatedDetails = req.body;
    const user = await User.findById(req.user._id);

    if (updatedDetails.name) user.name = updatedDetails.name;
    if (updatedDetails.pictureUrl) user.pictureUrl = updatedDetails.pictureUrl;

    await user.save();

    res.status(200).json(user);
};

const controller = {
    getUserByID,
    updateUser,
};

module.exports = controller;
