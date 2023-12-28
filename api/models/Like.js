const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    likeId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Like", likeSchema);
