const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

exports.register = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        //All good
        const hashedPassword = await argon2.hash(password);

        const newUser = new UserModel({
            username: username,
            password: hashedPassword,
        });

        await newUser.save();

        const accessToken = jwt.sign(
            { userID: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.status(200).send({
            success: true,
            message: 'Register success',
            accessToken: accessToken,
        });
    } catch (error) {
        console.log('Save error: ' + error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error when register',
        });
    }
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'Missing username and/or password',
        });
    }

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Login failed',
            });
        }

        const passwordValidate = await argon2.verify(user.password, password);

        if (!passwordValidate) {
            return res.status(400).json({
                success: false,
                message: 'Login failed',
            });
        }

        //All good
        const accessToken = jwt.sign(
            { userID: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return res.status(200).send({
            success: true,
            message: 'Login success',
            accessToken: accessToken,
        });
    } catch (error) {
        console.log('Save error: ' + error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error when login',
        });
    }
};
