const express = require('express')
const router = express.Router();
const subject = require('../../../models/Course/Subject')

//edit subject
router.patch('/subject/:id', async (req, res) => {
    try {
        const updateSub = await subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updateSub) {
            return res.status(404).json({ message: 'Subject not found' })
        }
        res.status(200).json({
            message: 'Subject updated successfully',
            data: updateSub
        })
    } catch {
        res.status(500).json({ message: 'Internal server error' })
    }
})

module.exports = router;