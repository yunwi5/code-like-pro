const UserSubmission = require('../models/UserSubmission');
const User = require('../models/User');
const Exercise = require('../models/Exercise');

const getUserByID = async (req, res) => {
    let user;
    try {
        // populate author field with author name
        const userPromise = User.findById(req.params.id)
            .populate({ path: 'liked', populate: { path: 'author', select: 'name' } })
            .lean();

        const submissionsPromise = UserSubmission.find({ user: req.params.id }).populate(
            'exercise',
        );
        const exercisesPromise = Exercise.find({ author: req.params.id }).populate('comments');

        // Await for async db operations all at once. Optimization purpose.
        const [userFound, submissions, exercises] = await Promise.all([
            userPromise,
            submissionsPromise,
            exercisesPromise,
        ]);

        user = userFound;
        user.submissions = submissions;
        user.exercises = exercises;
    } catch (err) {
        console.log(err.message);
    }

    if (user != null) {
        res.status(200).json(user);
    } else {
        res.status(404).json(`User ${req.params.id} not found`);
    }
};

const updateUser = async (req, res) => {
    const updatedDetails = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updatedDetails, { new: true });

    res.status(200).json(user);
};

const controller = {
    getUserByID,
    updateUser,
};

module.exports = controller;
