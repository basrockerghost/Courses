const express = require('express');
const User = require('../models/User');

const router = express.Router();

// **add student**
router.post('/student', async (req, res) => {
    try {
        const { personalID, firstname, lastname, password } = req.body;

        // ตรวจสอบว่าข้อมูลครบถ้วน
        if (!personalID || !firstname || !lastname || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // ตรวจสอบความยาวของรหัสผ่าน
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUserByStudentID = await User.findOne({ personalID });
        if (existingUserByStudentID) {
            return res.status(400).json({ message: 'Student ID already exists' });
        }

        // บันทึกข้อมูลผู้ใช้ใหม่
        const newUser = new User({
            personalID,
            firstname,
            lastname,
            password: password,
            role: 'student', // ค่าเริ่มต้น
        });

        await newUser.save();
        
        res.status(201).json({ message: 'User Add successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;