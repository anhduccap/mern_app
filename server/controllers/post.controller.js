const PostModel = require('../models/post.model');

exports.createPost = async (req, res, next) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' });
    }

    try {
        const newPost = new PostModel({
            title: title,
            description: description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'To do',
            user: req.userID,
        });

        await newPost.save();

        return res.json({
            success: true,
            message: 'Create post successfully',
            post: newPost,
        });
    } catch (error) {
        console.log('Save error: ' + error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error when creating post',
        });
    }
};

exports.getPost = async (req, res) => {
    try {
        const posts = await PostModel.find({ user: req.userID }).populate(
            'user',
            ['username']
        );

        return res.json({
            success: true,
            message: 'Get all post successfully',
            posts: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error when getting post',
        });
    }
};

exports.updatePost = async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is required' });
    }

    try {
        let updatedPost = {
            title: title,
            description: '' || description,
            url: '' || (url.startsWith('https://') ? url : `https://${url}`),
            status: status || 'To do',
            user: req.userID,
        };

        const postUpdateCondition = {
            _id: req.params.postID,
            user: req.userID,
        };

        // new: true --> return object after updating
        updatedPost = await PostModel.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        );

        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorize',
            });

        return res.json({
            success: true,
            message: 'Update post successfully',
            newPost: updatedPost,
        });
    } catch (error) {
        console.log('Save error: ' + error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error when updating post',
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletePostCondition = {
            _id: req.params.postID,
            user: req.userID,
        };

        const deletePost = await PostModel.findOneAndDelete(
            deletePostCondition
        );

        if (!deletePost)
            return res.status(401).json({
                success: false,
                message: 'Post not found or user not authorize',
            });

        res.json({
            success: true,
            message: 'Delete post successfully',
            post: deletePost,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error when deleting post',
        });
    }
};
