const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
