const mongoose = require('mongoose');
const Comment = require('../models/Comment');

// Get all replying comments of the comment of the param id.
const getReplyComments = async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);
        // If the comment was not found, return 404.
        if (comment == null)
            return res.status(404).json({ message: 'Comment not found' });

        const replyComments = await Comment.find({ replyTo: comment }).populate({
            path: 'user',
            select: ['email', 'name', 'picture'],
        });
        return res.status(200).json(replyComments);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Non existing showcase id' });
        }
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Add a replying comment to the comment of the param id.
const postReplyComment = async (req, res) => {
    const commentId = req.params.id;
    const { text } = req.body;

    try {
        // Find the existing comment by the id from params.
        const comment = await Comment.findById(commentId);
        // If the comment was not found, return 404.
        if (comment == null)
            return res.status(404).json({ message: 'Comment not found' });

        // SubComment that replies to the existing comment of the param id.
        const replyComment = new Comment({ text, user: req.user, replyTo: comment });
        await replyComment.save();
        res.status(201).json(replyComment);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Non existing showcase id' });
        }
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

/* Edit/patch the comment. User can only edit the text of the comment. */
const patchComment = async (req, res) => {
    const commentId = req.params.id;
    const { text } = req.body;

    try {
        const comment = await Comment.findById(commentId).populate({
            path: 'user',
            select: ['name', 'picture'],
        });
        if (comment == null)
            return res.status(404).json({ message: 'Comment not found' });

        // If the user is not the author of the comment, do not authorize the operation.
        if (comment.user._id.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: 'You are not the author of the comment' });
        }

        // Replace the old text to the new text from req.
        comment.text = text;
        await comment.save();
        res.status(200).json(comment);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Invalid comment id' });
        } else if (err instanceof mongoose.Error) {
            return res.status(400).json({ message: 'Bad request' });
        }
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Delete the comment of the param id from the database.
const deleteComment = async (req, res) => {
    const commentId = req.params.id;

    try {
        // Find the comment
        const comment = await Comment.findById(commentId);
        if (comment == null)
            return res.status(404).json({ message: 'Comment not found' });

        // If the user is not the author of the comment, do not authorize.
        if (comment.user.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ message: 'You are not the author of the comment' });
        }

        // Delete the comment itself.
        const p1 = comment.remove();
        // Delete all the replying comments of this comment, if exist.
        const p2 = Comment.deleteMany({ replyTo: comment._id });
        await Promise.all([p1, p2]);

        res.status(200).json(comment);
    } catch (err) {
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Invalid comment id' });
        }
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Upvote/downvote the comment by the user.
const voteComment = async (req, res) => {
    const commentId = req.params.id;
    // Vote type: either 'up' or 'down'
    const { type } = req.body;

    try {
        const comment = await Comment.findById(commentId).populate('votes');
        // If there is no existing comment of the param id, return 404.
        if (comment == null)
            return res.status(404).json({ message: 'Comment not found' });

        // Check if there is an existing vote to this comment by the user.
        const foundVote = comment.votes.find(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );
        if (foundVote) {
            // If there is existing vote, modify its type either 'up' or 'down' vote.
            foundVote.type = type;
        } else {
            // If there is no vote from this user, create new one and push to its votes list.
            const newVote = { type, user: req.user };
            comment.votes.push(newVote);
        }

        // Save the comment last so that the changes in vote persist.
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Cancel the user's vote on the comment
const cancelVoteComment = async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId);

        const foundIndex = comment.votes.findIndex(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );

        if (foundIndex < 0) {
            // If the vote was not found, return 404
            return res.status(404).json({ message: 'User vote not found' });
        } else {
            // Remove the vote from the array.
            comment.votes.splice(foundIndex, 1);
            await comment.save();
            return res.status(200).json(comment);
        }
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error.CastError) {
            return res.status(404).json({ message: 'Invalid comment id' });
        }
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

const controller = {
    getReplyComments,
    postReplyComment,
    patchComment,
    deleteComment,
    voteComment,
    cancelVoteComment,
};

module.exports = controller;
