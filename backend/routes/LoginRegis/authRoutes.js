const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User/User');

const router = express.Router();

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     }
// })

// registration
router.post('/register', async (req, res) => {
    try {
        const { personalID, firstname, lastname, email, password, con_password } = req.body;

        // ตรวจสอบว่าข้อมูลครบถ้วน
        if (!personalID || !firstname || !lastname || !email || !password || !con_password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // ตรวจสอบว่ารหัสผ่านและ confirm password ตรงกันหรือไม่
        if (password !== con_password) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // ตรวจสอบรูปแบบอีเมล
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // ตรวจสอบความยาวของรหัสผ่าน
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        // ตรวจสอบว่ามีอีเมลนี้อยู่แล้วหรือไม่
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const existingUserByStudentID = await User.findOne({ personalID });
        if (existingUserByStudentID) {
            return res.status(400).json({ message: 'Student ID already exists' });
        }

        // บันทึกข้อมูลผู้ใช้ใหม่
        const newUser = new User({
            personalID,
            firstname,
            lastname,
            email,
            password: password,
            role: 'student', // ค่าเริ่มต้น
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// **User Login**
router.post('/login', async (req, res) => {
    try {
        const { personalID, password } = req.body;
        
        console.log("Login Request:", { personalID, password });

        if (!personalID || !password) {
            return res.status(400).json({ message: 'Student ID and password are required' });
        }

        // ค้นหาผู้ใช้จาก personalID
        const user = await User.findOne({ personalID });
        console.log("Found User:", user); // 🔍 ตรวจสอบค่าผู้ใช้ที่เจอ

        if (!user) {
            return res.status(400).json({ message: 'Invalid student ID or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid student ID or password' });
        }

        // ตรวจสอบ JWT_SECRET
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Server error: JWT secret is missing' });
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token, user: { _id: user._id, personalID, firstname: user.firstname, lastname: user.lastname, role: user.role , email: user.email, curriculumId: user.curriculumId, totalCredits: user.totalCredits, GPA: user.GPA, subjects: user.subjects, students: user.students } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/request-reset', async (req, res) => {
    try {
        const {personalID, email } = req.body;
        

        if(!personalID || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ personalID, email });
        if(!user) {
            return res.status(404).json({ message: 'User not found'})
        }
        return res.status(200).json({ message: 'User verified, proceed to reset password' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { personalID, email, newPassword, conPassword } = req.body;

        if (!personalID || !email || !newPassword || !conPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(newPassword !== conPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ personalID, email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;