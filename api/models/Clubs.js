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
    clubDescription: {
        type: String
    },
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
    clubSubscribers: [{
        type: String,
        ref: 'User'
        }
    ] // a list of all the subscribers of the club
});

module.exports = mongoose.model("Club", clubSchema);