const mongoose = require('mongoose');

const StructureSchema = new mongoose.Schema({
    curriculumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curriculum',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    categories: [{
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        groups: [{
            groupId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Group',
                required: true
            },
            subjects: [{
                subjectId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Subject',
                    required: true
                }
            }]
        }]
    }]
})

module.exports = mongoose.model('Structure', StructureSchema);