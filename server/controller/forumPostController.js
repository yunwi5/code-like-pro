const mongoose = require('mongoose');
const ForumPost = require('../models/ForumPost');
const Comment = require('../models/Comment');

const createForumPost = async (req, res) => {
    const forumPost = new ForumPost(req.body);
    forumPost.author = req.user._id;

    await forumPost.save();

    res.status(201).json(forumPost);
};

const getForumPosts = async (req, res) => {
    try {
        const forumPosts = await ForumPost.find({}).populate('author', 'name picture');
        res.status(200).json(forumPosts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

const getForumPostByCategory = async (req, res) => {
    try {
        const forumPosts = await ForumPost.find({
            category: req.params.category,
        }).populate('author', 'name picture');
        res.status(200).json(forumPosts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

const getForumPostById = async (req, res) => {
    const forumId = req.params.id;

    try {
        const forumPost = await ForumPost.findById(forumId)
            .populate({
                path: 'author',
                select: ['name', 'picture'],
            })
            .populate({
                path: 'comments',
                populate: { path: 'user', select: ['name', 'picture'] },
            });

        res.status(200).json(forumPost);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

const updateForumPost = async (req, res) => {
    let forumPost;

    try {
        forumPost = await ForumPost.findById(req.params.id);
    } catch (err) {
        console.log(err.message);
    }

    if (forumPost != null) {
        try {
            const updatedDetails = req.body;

            if (req.user._id.toString() != forumPost.author.toString()) {
                res.status(400).json({
                    message: 'Error, user does not have permission to edit forum post',
                });
            }

            forumPost = await ForumPost.findByIdAndUpdate(req.params.id, updatedDetails, {
                new: true,
            });

            res.status(200).json(forumPost);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'Something went wrong...' });
        }
    } else {
        res.status(404).json({ message: `Forum post ${forumId} was not found` });
    }
};

const deleteForumPost = async (req, res) => {
    const forumId = req.params.id;
    let forum;

    try {
        forum = await ForumPost.findById(forumId);
    } catch (err) {
        console.log(err.message);
    }

    if (forum != null) {
        try {
            if (forum.author?.toString() !== req.user._id.toString()) {
                return res
                    .status(401)
                    .json({ message: `You are not the author of the post!` });
            }

            // Delete all the comments of this post, as they are now redundant.
            const p1 = Comment.deleteMany({ _id: { $in: forum.comments } });
            const p2 = forum.remove();
            await Promise.all([p1, p2]);

            res.status(200).json({ message: 'Deleted' });
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ message: 'Something went wrong' });
        }
    } else {
        res.status(404).json({ message: `Forum post ${forumId} was not found` });
    }
};

// Post a forumPost comment
const postForumPostComment = async (req, res) => {
    // Comment text is the only thing needed from the body.
    const { text } = req.body;
    const forumId = req.params.id;
    const userId = req.user._id;
    try {
        const comment = new Comment({ user: userId, text });
        const forumPost = await ForumPost.findById(forumId);
        if (forumPost == null)
            return res
                .status(404)
                .json({ message: `Forum post ${forumId} was not found` });

        // Push the comment at the end of the 'comments' array
        forumPost.comments.push(comment);
        const p1 = forumPost.save();
        const p2 = comment.save();
        await Promise.all([p1, p2]);
        res.status(201).json(comment);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete a forum post
// Receive :id (post id), and :commentId (comment id)
const deleteForumPostComment = async (req, res) => {
    const forumId = req.params.id;
    const commentId = req.params.commentId;
    // const userId = req.user._id;

    try {
        const commentPromise = Comment.findByIdAndDelete(commentId);
        const forumPostPromise = ForumPost.findById(forumId);

        const [_, forumPost] = await Promise.all([commentPromise, forumPostPromise]);
        if (forumPost == null)
            return res.status(404).json({ message: `Forum ${forumId} was not found` });

        // Remove the comment id from the array of 'comments' of the ForumPost
        forumPost.comments = forumPost.comments.filter(
            (cid) => cid.toString() !== commentId,
        );

        await forumPost.save();
        res.status(200).json({ message: 'Forum post comment deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

/* User upvote | downvote the post. type is either 'up' | 'down' */
const postVote = async (req, res) => {
    const { type } = req.body;

    try {
        const forumPost = await ForumPost.findById(req.params.id);
        // Check if show case exists, return 404 if not
        if (forumPost == null)
            res.status(404).json({ message: `Forum post ${req.params.id} not found` });

        // See if there is already an existing vote made by the user
        const foundVote = forumPost.votes.find(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );
        if (foundVote) {
            // If user has already voted, update vote
            foundVote.type = type;
        } else {
            // If user has not voted, create new vote
            const newVote = { type, user: req.user._id };
            forumPost.votes.push(newVote);
        }

        await forumPost.save();
        res.status(201).json(forumPost);
    } catch (err) {
        console.log(err.message);
        if (err instanceof mongoose.Error) {
            return res.status(404).json({ message: 'Non existing forum post id' });
        }
        res.status(404).json({ message: 'Something went wrong...' });
    }
};

const deleteVote = async (req, res) => {
    try {
        const forumPost = await ForumPost.findById(req.params.id).populate('votes');
        // Check if show case exists, return 404 if not
        if (forumPost == null)
            res.status(404).json({ message: `Forum post ${req.params.id} not found` });

        // Find index of existing vote made by the user, if there is one
        const foundIndex = forumPost.votes.findIndex(
            (vote) => vote.user.toString() === req.user._id.toString(),
        );

        // If user has no vote return error
        if (foundIndex < 0) {
            return res.status(404).json({ message: 'User vote not found' });
        } else {
            // If user has not voted, create new vote
            forumPost.votes.splice(foundIndex, 1);
            await forumPost.save();
            return res.status(200).json(forumPost);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

const controller = {
    createForumPost,
    getForumPosts,
    getForumPostByCategory,
    getForumPostById,
    deleteForumPost,
    postForumPostComment,
    deleteForumPostComment,
    updateForumPost,
    postVote,
    deleteVote,
};

module.exports = controller;
