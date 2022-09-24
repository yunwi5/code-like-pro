const ForumPost = require('../models/ForumPost');
const Comment = require('../models/Comment');

const createForumPost = async(req, res) =>{
    const forumPost = new ForumPost(req.body);
    forumPost.author = req.user._id;

    forumPost.save();

    res.status(200).json(forumPost);
}

const getForumPost = async(req, res) =>{
    try{
        const forumPosts = await ForumPost.find({}).populate("author", "name pictureUrl");
        res.status(200).json(forumPosts);
    } catch (err){
        console.log(err.message);
        res.status(400).json(err.message);
    }
}

const getForumPostByCategory = async(req, res) =>{
    try{
        const forumPosts = await ForumPost.find({'category': req.params.category}).populate("author", "name pictureUrl");
        res.status(200).json(forumPosts);
    } catch (err){
        console.log(err.message);
        res.status(400).json(err.message);
    }
}


const controller = {
    createForumPost,
    getForumPost,
    getForumPostByCategory,
}

module.exports = controller;