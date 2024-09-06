const mongoose = require("mongoose");

const pyqSchema = new mongoose.Schema({
    branchName: { 
        type: String, 
        required: true 
    },
    batch: { 
        type: Number, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    profName: { 
        type: String, 
        required: true 
    },
    courseName: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: true 
    }, // Assuming the link is a URL to the PDF or resource
    sem: { 
        type: String, 
        enum: ["odd", "even"], 
        required: true 
    },
    type: { 
        type: String, 
        enum: ["minor-1", "minor-2", "minor-3", "mid", "end"], 
        required: true 
    }
});

module.exports = mongoose.model("PYQ", pyqSchema);
