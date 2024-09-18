const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have Title"]
    },
    body: {
        type: String,
        require: [true, "Post must Have Body"]
    },
})

const Post = mongoose.model("Post", postSchema);
module.exports = Post

