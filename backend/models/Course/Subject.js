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
        enum: [1, 3, 5],
        default: 1
    },
    description: {
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);