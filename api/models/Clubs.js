const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    clubId: { type: String, 
        unique: true, 
        required: true 
    },
    clubName: { 
        type: String, 
        required: true,
        unique: true, 
    },
    clubLogo: { 
        type: String 
    }, // Assuming the logo is stored as a file path or URL
    clubOwners: [{
        type: String, 
        ref: 'User' }],
    clubAdmins: [{
         type: String, 
         ref: 'User' }],
    clubPosts: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Post' }],
    clubMembers: [{
        type: String, 
        ref: 'User' }],
    // owner
});

module.exports = mongoose.model("Club", clubSchema);