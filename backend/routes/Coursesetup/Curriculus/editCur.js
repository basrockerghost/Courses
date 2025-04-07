const express = require('express')
const router = express.Router();
const Curriculum = require('../../../models/Course/Curriculum')

//edit curriculum
router.patch('/curriculum/:id', async (req, res) => {
    try {
        const updatedCurriculum = await Curriculum.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updatedCurriculum) {
            return res.status(404).json({ message: 'Curriculum not found' })
        }
        res.status(200).json({
            message: 'Curriculum updated successfully',
            curriculum: updatedCurriculum
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;