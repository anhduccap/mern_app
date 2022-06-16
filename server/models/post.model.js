const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        url: String,
        status: {
            type: String,
            enum: ['To do', 'Learning', 'Complete'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'Post' }
);

module.exports = mongoose.model('Post', PostSchema);
