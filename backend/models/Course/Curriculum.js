const mongoose = require('mongoose');

const CurriculumSchema = new mongoose.Schema({
    curriculumnameTH: {
        type: String,
        required: true,
    },
    curriculumnameEN: {
        type: String,
        required: true,
    },
    status: {
        type: String, 
        enum: ['ไม่พร้อมใช้งาน', 'ปิดปรับปรุง', 'พร้อมใช้งาน'],
        default: 'ไม่พร้อมใช้งาน'
    },
    description: {
        type: String,
        sparse: true,
        trim: true,
        default: null
    },
}, { timestamps: true })

module.exports = mongoose.model('Curriculum', CurriculumSchema);