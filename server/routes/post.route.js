const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// @route GET api/post
// @desc View post
// @access Private
router.get('/', authMiddleware.verifyToken, postController.getPost);

// @route POST api/post
// @desc Create post
// @access Private
router.post('/', authMiddleware.verifyToken, postController.createPost);

// @route PUT api/post/:postID
// @desc Update post
// @access Private
router.put('/:postID', authMiddleware.verifyToken, postController.updatePost);

// @route DELETE api/post/:postID
// @desc Delete post
// @access Private
router.delete(
    '/:postID',
    authMiddleware.verifyToken,
    postController.deletePost
);

module.exports = router;
