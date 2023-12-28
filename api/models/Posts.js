const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    poster: { 
        type: String 
    }, // Assuming the poster is stored as a file path or URL
    clubId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Club', required: true 
    },
    postTitle: {
        type: String, 
        required: true 
    },
    postDescription: { 
        type: String 
    },
});

module.exports = mongoose.model("Post", postSchema);
  