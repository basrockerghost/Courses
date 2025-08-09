const express = require('express');
const course = require('../../../models/Course/Course');

const router = express.Router();

// show all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await course.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/generate-courseid', async (req, res) => {
    try {
        const last = await course.findOne().sort({ CSId: -1 }).lean();

        let nextNumber = 1;
        if (last && last.CSId) {
            const num = parseInt(last.CSId.replace('CS-', ''));
            if (!isNaN(num)) nextNumber = num + 1;
        }

        const padded = String(nextNumber).padStart(4, '0');
        res.json({ CSId: `CS-${padded}` });
    } catch (err) {
        res.status(500).json({message: "Server Error"})
    }
})

module.exports = router;