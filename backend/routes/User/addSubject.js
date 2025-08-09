const express = require('express')
const router = express.Router();
const Subject = require('../../models/Course/Subject')
const User = require('../../models/User/User')

// add subject in user model
router.patch('/user/:userId/subject/:subjectId', async (req, res) => {
    try {
        const { userId, subjectId } = req.params;
        const { termandyear, description } = req.body;

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // ตรวจสอบว่าผู้ใช้มีวิชานี้อยู่แล้วหรือไม่
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingSubject = user.subjects.find((s) =>
            s.subjectId.toString() === subjectId
        );

        if (existingSubject) {
            // ถ้ามีอยู่แล้ว ให้ update description
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId, "subjects.subjectId": subjectId },
                { $set: 
                    { "subjects.$.termandyear": termandyear , "subjects.$.description": description} 
                },
                { $set: {  } },
                { new: true }
            );
            return res.status(200).json({
                message: 'Description updated successfully',
                user: updatedUser
            });
        } else {
            // ถ้ายังไม่มี ให้ push วิชาใหม่เข้าไป
            const subjectObj = {
                subjectId: subject._id,
                credits: subject.credits,
                termandyear: termandyear || null,
                description: description || null
            };

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { subjects: subjectObj } },
                { new: true, runValidators: true }
            );
            return res.status(200).json({
                message: 'Subject added successfully',
                user: updatedUser
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// add term and year
router.patch('/user/:userId/subject/:subjectId/termandyear', async (req, res) => {
    try {
        const { userId, subjectId } = req.params;
        const { termandyear } = req.body;

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        // ตรวจสอบว่าผู้ใช้มีวิชานี้อยู่แล้วหรือไม่
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingSubject = user.subjects.find((s) =>
            s.subjectId.toString() === subjectId
        );

        if (existingSubject) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId, "subjects.subjectId": subjectId },
                { $set: { "subjects.$.termandyear": termandyear } },
                { new: true }
            );
            return res.status(200).json({
                message: 'Term and year updated successfully',
                user: updatedUser
            });
        } else {
            // ถ้ายังไม่มี ให้ push วิชาใหม่เข้าไป
            const subjectObj = {
                subjectId: subject._id,
                credits: subject.credits,
                termandyear: termandyear || null
            };
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { subjects: subjectObj } },
                { new: true, runValidators: true }
            );
            return res.status(200).json({
                message: 'Term and year added successfully',
                user: updatedUser
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/user/:userId/subject/:subjectId/grade', async (req, res) => {
    try {
        const { userId, subjectId } = req.params;
        const { grade } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const subject = user.subjects.find(s => s.subjectId.toString() === subjectId);
        if (!subject) return res.status(404).json({ message: 'Subject not found' });

        subject.grade = grade;

        // Calculate GPA before saving
        user.calculateGPA();

        await user.save();

        res.json({ message: 'Grade updated', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
