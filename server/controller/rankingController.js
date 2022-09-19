const Exercise = require('../models/Exercise');
const User = require('../models/User');
const UserSubmission = require('../models/UserSubmission');
const { Difficulty } = require('../models/enums');

// Helper functions for constructing user ranking data map/dict.
const constructUserRankingDataMap = (users) => {
    // Construct the user ranking map. Key is user._id.
    const userRankingDataMap = {};
    users.forEach((user) => {
        const userRankingData = {
            user: { _id: user._id, name: user.name, pictureUrl: user.pictureUrl },
            creationPoints: 0,
            solvingPoints: 0,
        };
        userRankingDataMap[user._id.toString()] = userRankingData;
    });
    return userRankingDataMap;
};

// Get different ranking point multiplier for different exercise difficulties.
// Easy ones have the lowest and expert ones have the highest multiplier for rankings.
function getDifficultyMultiplier(difficulty) {
    switch (difficulty) {
        case Difficulty.EASY:
            return 4;
        case Difficulty.MEDIUM:
            return 5;
        case Difficulty.HARD:
            return 6;
        case Difficulty.EXPERT:
            return 7;
        default:
            return 0;
    }
}

function addCreationPoints(userRankingDataMap, exercises) {
    // Adding ranking data for exercise creations.
    exercises.forEach((ex) => {
        const authorId = ex.author.toString();
        if (authorId in userRankingDataMap) {
            // Each creation has default ranking points of 30.
            userRankingDataMap[authorId].creationPoints += 30;

            // Number of likes on the exercise will increase points further.
            const numLiked = ex.liked.length;

            // Each like is worth 5 points.
            const likedPoints = numLiked * 5;
            userRankingDataMap[authorId].creationPoints += likedPoints;
        }
    });
}

function addSolvingPoints(userRankingDataMap, submissions) {
    // Adding ranking data for exercise solving.
    submissions.forEach((sub) => {
        // If the submission is incorrect, ignore it for ranking calculation.
        if (!sub.correct) return;

        const userId = sub.user.toString();
        if (userId in userRankingDataMap) {
            // Each solving has default ranking points of 10.
            userRankingDataMap[userId].solvingPoints += 10;

            // Difficulty multiplier between 4 ~ 7
            const difficultyMultiplier = getDifficultyMultiplier(sub.exercise.difficulty);
            userRankingDataMap[userId].solvingPoints += 2 * difficultyMultiplier;
        }
    });
}

const getUserRankings = async (req, res) => {
    const usersPromise = User.find({});
    const exercisesPromise = Exercise.find({});
    const submissionsPromise = UserSubmission.find({}).populate('exercise', 'difficulty');

    // Query all users, exercises and submissions data.
    const [users, exercises, submissions] = await Promise.all([
        usersPromise,
        exercisesPromise,
        submissionsPromise,
    ]);

    // Construct the user ranking map. Key is user._id.
    const userRankingDataMap = constructUserRankingDataMap(users);

    // Adding ranking data for exercise creations.
    addCreationPoints(userRankingDataMap, exercises);

    // Adding ranking data for exercise solving.
    addSolvingPoints(userRankingDataMap, submissions);

    // Showcase results will also be taken into account for the ranking.

    const userRankingDataArray = Object.values(userRankingDataMap);

    return res.status(200).json(userRankingDataArray);
};

module.exports = { getUserRankings };
