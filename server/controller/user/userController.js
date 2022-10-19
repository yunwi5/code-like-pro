const mongoose = require('mongoose');
const UserSubmission = require('../../models/UserSubmission');
const User = require('../../models/User');
const Exercise = require('../../models/Exercise');

const getUserById = async (req, res) => {
    let user;
    try {
        // Do not select 'liked' exercises, and password (sensitive info)
        const userPromise = User.findById(req.params.id)
            .select({ liked: 0, password: 0 })
            .lean();

        const submissionsPromise = UserSubmission.find({ user: req.params.id }).populate(
            'exercise',
        );

        // UserSubmission.deleteMany({});
        const [userFound, submissions] = await Promise.all([
            userPromise,
            submissionsPromise,
        ]);

        const usedLanguages = new Set();
        // Derive a set of languages used by the user.
        for (const sub of submissions) {
            if (!usedLanguages.has(sub.exercise.language)) {
                usedLanguages.add(sub.exercise.language);
            }
        }

        user = userFound;
        const languages = Array.from(usedLanguages);
        user.languages = languages;
        // current app stores the list of the most recent submission only, so the length of submissions is essentially the number of exercises solved.
        user.solvedExercises = submissions.length;

        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(404).json(`User ${req.params.id} not found`);
    }
};

const getUserDetailById = async (req, res) => {
    let user;
    try {
        // populate author field with author name
        const userPromise = User.findById(req.params.id)
            .populate({ path: 'liked', populate: { path: 'author', select: 'name' } })
            .lean();

        const submissionsPromise = UserSubmission.find({ user: req.params.id }).populate(
            'exercise',
        );
        const exercisesPromise = Exercise.find({ author: req.params.id }).populate(
            'comments',
        );

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

// GET a list of user's badges of the user of the param id
const getUserBadges = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate({ path: 'badges' });
        const badges = user.badges;

        // Return an array of badges
        return res.status(200).json(badges);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateUser = async (req, res) => {
    const updatedDetails = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updatedDetails, {
        new: true,
    });

    res.status(200).json(user);
};

const controller = {
    getUserById,
    getUserDetailById,
    getUserBadges,
    updateUser,
};

module.exports = controller;
