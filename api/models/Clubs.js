const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    clubId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    clubName: { 
        type: String, 
        required: true,
        unique: true, 
    },
    clubEmail: {
        type: String,
        unique: true
    },
    clubLogo: { 
        type: String 
    }, // Assuming the logo is stored as a file path or URL
    clubDescription: {
        type: String
    },
    clubOwners: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    clubAdmins: [{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'User' }],
    clubPosts: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Post' }],
    clubMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' }],
    clubSubscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    ] // a list of all the subscribers of the club
});

module.exports = mongoose.model("Club", clubSchema);