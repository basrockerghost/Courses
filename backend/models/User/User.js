const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// user model
const UserSchema = new mongoose.Schema({
    personalID: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },
    firstname: { 
        type: String, 
        required: true, 
        trim: true 
    },
    lastname: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        unique: true,
        sparse: true,
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
        default: null
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['student', 'teacher', 'admin'], 
        default: 'student' 
    },
    profileImage: { 
        type: String, 
        default: '' 
    },
    curriculumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curriculum',
        default: null
    },
    totalCredits: {
        type: Number,
        default: 0
    },
    GPA: {
        type: Number,
        min: 0,
        max: 4.0,
        default: 0.0
    },
    subjects: [
        {
            subjectId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject',
                required: true
            },
            credits: {
                type: Number,
                required: true
            },
            grade: {
                type: String,
                enum: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'],
                default: null
            },
            description: {
                type: String,
                default: null
            }
        }, 
    ]
}, { timestamps: true });

// **แฮชรหัสผ่านก่อนบันทึก**
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.calculateGPA = function () {
    const gradePoints = {
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D+': 1.5,
        'D': 1.0,
        'F': 0.0,
    };

    let totalPoints = 0;
    let totalCredits = 0;

    // this.subjects.forEach((subject) => {
    //     if (
    //         subject.grade &&
    //         gradePoints.hasOwnProperty(subject.grade) &&
    //         subject.grade !== 'F' // 💥 ข้ามวิชาที่ได้ F
    //     ) {
    //         totalPoints += gradePoints[subject.grade] * subject.credits;
    //         totalCredits += subject.credits;
    //     }
    // });

    // this.GPA = totalCredits === 0 ? 0.0 : parseFloat((totalPoints / totalCredits).toFixed(2));
    this.subjects.forEach(subject => {
        if (
            subject.grade &&
            gradePoints.hasOwnProperty(subject.grade) &&
            subject.grade !== 'F'
        ) {
            totalPoints += gradePoints[subject.grade] * subject.credits;
            totalCredits += subject.credits;
        }
    });

    this.totalCredits = totalCredits;
    this.GPA = totalCredits === 0 ? 0.0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};


module.exports = mongoose.model('User', UserSchema);