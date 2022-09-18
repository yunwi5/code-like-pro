const ExerciseReport = require('../models/ExerciseReport');

const postReportVote = async (req, res) => {
    const reportId = req.params.id;

    // Vote type: either 'up' or 'down'
    const { type } = req.body;

    try {
        const report = await ExerciseReport.findById(reportId).populate('votes');
        // If there is no existing report of the param id, return 404.
        if (report == null) return res.status(404).json(`Report ${reportId} not found`);

        // Check if there is an existing vote to this report by the user.
        const foundVote = report.votes.find(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );
        if (foundVote) {
            // If there is existing vote, modify its type either 'up' or 'down' vote.
            foundVote.type = type;
        } else {
            // If there is no vote from this user, create new one and push to its votes list.
            const newVote = { type, user: req.user };
            report.votes.push(newVote);
        }

        // Save the report last so that the changes in vote persist.
        await report.save();
        res.status(201).json(report);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

const deleteReportVote = async (req, res) => {
    const reportId = req.params.id;

    try {
        const report = await ExerciseReport.findById(reportId);

        const foundIndex = report.votes.findIndex(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );

        if (foundIndex < 0) {
            // If the vote was not found, return 404
            return res.status(404).json({ message: 'User vote not found' });
        } else {
            // Remove the vote from the array.
            report.votes.splice(foundIndex, 1);
            await report.save();
            return res.status(200).json(report);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    postReportVote,
    deleteReportVote,
};
