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

module.exports = router;