const express = require('express');
const course = require('../../../models/Course/Course');

const router = express.Router();

// create course
router.post('/course', async (req, res) => {
    try {
        const { CSId, coursenameTH, coursenameEN, courseStart, courseEnd, description } = req.body;

        if (!CSId || !coursenameTH || !coursenameEN || !courseStart || !courseEnd) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingCourseId = await course.findOne({ CSId });
        if (existingCourseId) {
            return res.status(400).json({ message: 'Course ID already exists' });
        }

        const existingCoursename = await course.findOne({ coursenameTH, coursenameEN });
        if (existingCoursename) {
            return res.status(400).json({ message: 'Coursename already exists' });
        }

        const newCourse = new course({
            CSId,
            coursenameTH,
            coursenameEN,
            courseStart,
            courseEnd,
            description
        });

        await newCourse.save();

        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router;