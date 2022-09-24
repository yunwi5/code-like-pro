const ForumPost = require('../models/ForumPost');
const Comment = require('../models/Comment');

const createForumPost = async (req, res) => {
    const forumPost = new ForumPost(req.body);
    forumPost.author = req.user._id;

    forumPost.save();

    res.status(200).json(forumPost);
};

const getForumPosts = async (req, res) => {
    try {
        const forumPosts = await ForumPost.find({}).populate('author', 'name pictureUrl');
        res.status(200).json(forumPosts);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

const getForumPostByCategory = async (req, res) => {
    try {
        const forumPosts = await ForumPost.find({ category: req.params.category }).populate(
            'author',
            'name pictureUrl',
        );
        res.status(200).json(forumPosts);
    } catch (err) {
        console.log(err.message);
        res.status(400).json(err.message);
    }
};

const getForumPostById = async (req, res) => {
    const forumId = req.params.id;

    try {
        const forumPost = await ForumPost.findById(forumId)
            .populate({
                path: 'author',
                select: ['name', 'pictureUrl'],
            })
            .populate({
                path: 'comments',
                populate: { path: 'user', select: ['name', 'pictureUrl'] },
            });

        res.status(200).json(forumPost);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
    }
};

const deleteForumPost = async (req, res) => {
    const forumId = req.params.id;

    try {
        const forum = await ForumPost.findById(forumId);
        if (forum == null) return res.status(404).send(`Forum post ${forumId} was not found`);

        if (forum.author?.toString() !== req.user._id.toString()) {
            return res.status(401).send(`You are not the author of the post!`);
        }

        // Delete all the comments of this post, as they are now redundant.
        const p1 = Comment.deleteMany({ _id: { $in: forum.comments } });
        const p2 = forum.remove();
        await Promise.all([p1, p2]);

        res.status(200).send('Deleted');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
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
            return res.status(404).send(`Forum post ${forumId} was not found`);

        // Push the comment at the end of the 'comments' array
        forumPost.comments.push(comment);
        const p1 = forumPost.save();
        const p2 = comment.save();
        await Promise.all([p1, p2]);
        res.status(201).json(comment);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
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
        if (forumPost == null) return res.status(404).send(`Forum ${forumId} was not found`);

        // Remove the comment id from the array of 'comments' of the ForumPost
        forumPost.comments = forumPost.comments.filter((cid) => cid.toString() !== commentId);

        await forumPost.save();
        res.status(200).send('Forum post comment deleted');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
    }
};

/*
Users can like the post.
ForumPost stores the list of user ids who like the post inside 'liked' array attribute.
*/
const postForumPostLike = async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.id;

    try {
        const forumPost = await ForumPost.findById(postId);

        const foundIndex = forumPost.liked.findIndex(
            (id) => id.toString() === userId.toString(),
        );

        if (foundIndex < 0) {
            // Means the current userId does not exist, so append the user id at the end.
            forumPost.liked.push(userId);
        } else {
            // Means the current userId already exists, so delete the user id.
            forumPost.liked.splice(foundIndex, 1);
        }
        await forumPost.save();

        // Returns the updated ForumPost object.
        res.status(201).json(forumPost);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Something went wrong');
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
    postForumPostLike,
};

module.exports = controller;
