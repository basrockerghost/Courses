const express = require('express')
const router = express.Router();
const course = require('../../../models/Course/Course')

router.patch('/course/:id', async (req, res) => {
    try {
        const updateCourse = await course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!updateCourse) {
            return res.status(404).json({ message : 'Course not found'})
        }
        res.status(200).json({
            message : 'Course updated successfully',
            course : updateCourse
        })
    } catch {
        res.status(500).json({ message : 'Something went wrong'})
    }
})

module.exports = router;