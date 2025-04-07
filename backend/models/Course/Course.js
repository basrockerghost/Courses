const mongoose = require('mongoose');

// course model
const CourseSchema = new mongoose.Schema({
    CSId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    coursenameTH: { 
        type: String, 
        required: true, 
        trim: true 
    },
    coursenameEN: { 
        type: String, 
        required: true, 
        trim: true 
    },
    courseStart: { 
        type: Number, 
        required: true 
    },
    courseEnd: {
        type: Number, 
        required: true 
    },
    description: {
        type: String,
        sparse: true,
        trim: true,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Course', CourseSchema);