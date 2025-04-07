const express = require('express')
const router = express.Router();
const course = require('../../../models/Course/Course')

//delete course
router.delete('/course/:id', async (req, res) => {
    try {
        const deleteCourse = await course.findByIdAndDelete(req.params.id)
        if (!deleteCourse) {
            return res.status(404).json({ message: 'Course not found'})
        }
        res.json(deleteCourse)
    } catch {
        res.status(500).json({ message: 'Server Error'})
    }
})

module.exports = router;