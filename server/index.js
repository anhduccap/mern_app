const express = require('express');
const app = express();
require('dotenv').config();
require('./dbconfig').connectDB();

const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});
