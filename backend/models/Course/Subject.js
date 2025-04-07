const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectID: {
        type: String,
        required: true,
        unique: true
    },
    subjectnameTH: {
        type: String,
        required: true
    },
    subjectnameEN: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);