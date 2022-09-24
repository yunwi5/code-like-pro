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

const updateForumPost = async(req, res) =>{
    try{
        const updatedDetails = req.body;
        let forumPost = await ForumPost.findById(req.params.id);

        if ((req.user._id).toString() != forumPost.author.toString()){
            res.status(400).send("Error, user does not have permission to edit forum post");
        }

        forumPost = await ForumPost.findByIdAndUpdate(req.params.id, updatedDetails, {new: true});
        forumPost.save()

        res.status(200).json(forumPost);

    } catch(err){
        console.log(err.message);
        res.status(400).json(err.message);
    }
}


const controller = {
    createForumPost,
    getForumPost,
    getForumPostByCategory,
    updateForumPost,
}

module.exports = controller;