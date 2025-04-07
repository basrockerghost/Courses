const express = require('express')
const router = express.Router();
const curriculum = require('../../../models/Course/Curriculum')

//delete curriculum
router.delete('/curriculum/:id', async (req, res) => {
    try {
        const deletedCurriculum = await curriculum.findByIdAndDelete(req.params.id)
        if (!deletedCurriculum) {
            return res.status(404).json({ message: 'Curriculum not found' })
        }
        res.json({ message: 'Curriculum deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;