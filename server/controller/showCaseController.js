const mongoose = require('mongoose');
const ShowCase = require('../models/ShowCase');
const Comment = require('../models/Comment');

const postShowCase = async (req, res) => {
    const showCaseBody = req.body;
    const showCase = new ShowCase(showCaseBody);
    showCase.user = req.user._id;

    await showCase.save();

    res.status(201).json(showCase);
};

const getShowCaseByID = async (req, res) => {
    let showCase;
    try {
        showCase = await ShowCase.findById(req.params.id)
            .populate({ path: 'user', select: 'name' })
            .populate({ path: 'comments', populate: { path: 'user', select: 'name' } });
    } catch (err) {
        console.log(err.message);
    }
    if (showCase != null) {
        res.status(200).json(showCase);
    } else {
        res.status(404).json(`Showcase ${req.params.id} not found`);
    }
};

const deleteShowCase = async (req, res) => {
    let result; // returns deletedObject if the show case with the param id was found.
    try {
        result = await ShowCase.findByIdAndDelete(req.params.id);
    } catch (err) {
        console.log(err.message);
    }

    if (result != null) {
        return res.status(200).send('Delete successful.');
    } else {
        // If there is an error, or the show case was not found.
        res.status(404).send(`ShowCase ${req.params.id} not found`);
    }
};

const getShowCase = async (req, res) => {
    const showCases = await ShowCase.find({})
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'comments', populate: { path: 'user', select: 'name' } });

    res.status(200).json(showCases);
};

const updateShowCase = async (req, res) => {
    const updatedDetails = req.body;
    try {
        const showCase = await ShowCase.findByIdAndUpdate(req.params.id, updatedDetails, {
            new: true,
        });
        res.status(200).json(showCase);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Non existing showcase id' });
        }
        if (err instanceof mongoose.Error) {
            console.log(err);
            return res
                .status(400)
                .json({ message: 'Invalid shwowcase id or properties' });
        }

        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const getComments = async (req, res) => {
    let showCase;
    try {
        showCase = await ShowCase.findById(req.params.id).populate({
            path: 'comments',
            populate: { path: 'user', select: ['name', 'pictureUrl'] },
        });
    } catch (err) {
        console.log(err.message);
    }

    if (showCase != null) {
        res.status(200).json(showCase.comments);
    } else {
        // If there is an error, or the show case was not found
        res.status(404).send(`Showcase ${req.params.id} not found`);
    }
};

const postComment = async (req, res) => {
    const commentBody = req.body;
    const comment = new Comment(commentBody);
    comment.user = req.user._id;

    let showCase;
    try {
        showCase = await ShowCase.findById(req.params.id);
    } catch (err) {
        console.log(err.message);
    }
    if (showCase != null) {
        showCase.comments.push(comment._id);
    } else {
        return res.status(404).json(`Showcase ${req.params.id} not found`);
    }
    await comment.save();
    await showCase.save();

    res.status(200).json(comment);
};

const postVote = async (req, res) => {
    const { type } = req.body;

    try {
        const showCase = await ShowCase.findById(req.params.id);
        // Check if show case exists, return 404 if not
        if (showCase == null) res.status(404).send(`Showcase ${req.params.id} not found`);

        // See if there is already an existing vote made by the user
        const foundVote = showCase.votes.find(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );
        if (foundVote) {
            // If user has already voted, update vote
            foundVote.type = type;
        } else {
            // If user has not voted, create new vote
            const newVote = { type, user: req.user._id };
            showCase.votes.push(newVote);
        }

        await showCase.save();
        res.status(201).json(showCase);
    } catch (err) {
        console.log(err.message);
        res.status(404).json(err.message);
    }
};

const deleteVote = async (req, res) => {
    try {
        const showCase = await ShowCase.findById(req.params.id).populate('votes');
        // Check if show case exists, return 404 if not
        if (showCase == null) res.status(404).send(`Showcase ${req.params.id} not found`);

        // Find index of existing vote made by the user, if there is one
        const foundIndex = showCase.votes.findIndex(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );

        // If user has no vote return error
        if (foundIndex < 0) {
            return res.status(404).json({ message: 'User vote not found' });
        } else {
            // If user has not voted, create new vote
            showCase.votes.splice(foundIndex, 1);
            await showCase.save();
            return res.status(200).json(showCase);
        }
    } catch (err) {
        console.log(err.message);
        res.status(404).json(err.message);
    }
};

const controller = {
    postShowCase,
    getShowCase,
    getShowCaseByID,
    updateShowCase,
    deleteShowCase,
    postComment,
    getComments,
    postVote,
    deleteVote,
};

module.exports = controller;
