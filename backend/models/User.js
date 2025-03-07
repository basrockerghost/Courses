const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    credits: {
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
            subjectID: { type: String, required: true },
            subjectName: { type: String, required: true },
            credit: { type: Number, required: true }
        }
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

module.exports = mongoose.model('User', UserSchema);