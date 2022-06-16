const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// @route POST api/auth
// @desc Register user
// @access Public
router.post('/', authController.register);

// @route GET api/auth
// @desc Login
// @access Public
router.get('/', authController.login);

module.exports = router;
