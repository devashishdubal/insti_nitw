const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    clubId: { type: String, 
        unique: true, 
        required: true 
    },
    clubName: { 
        type: String, 
        required: true 
    },
    clubLogo: { 
        type: String 
    }, // Assuming the logo is stored as a file path or URL
    clubAdmins: [{
         type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ],
    clubPosts: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Post' }],
});

module.exports = mongoose.model("Club", clubSchema);