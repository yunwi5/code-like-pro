const UserSubmission = require('../models/UserSubmission');
const User = require('../models/User');
const Exercise = require('../models/Exercise');


const getUserByID = async (req, res) => {
    let user;
    try {
        // populate author field with author name
        user = await User.findById(req.params.id).populate('liked');
    } catch (err) {
        console.log(err.message);
    }

    if (user != null) {
        const userSubmissions = await UserSubmission.find({user: req.params.id}).populate('exercise');
        const userExercises = await Exercise.find({author: req.params.id});

        user.submissions = userSubmissions;
        user.exercises = userExercises;
        

        res.status(200).json(user);
    } else {
        res.status(404).json(`User ${req.params.id} not found`);
    }
};

const controller = {
    getUserByID,
};

module.exports = controller;
