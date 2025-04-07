const express = require('express')
const router = express.Router();
const subject = require('../../../models/Course/Subject')

//delete subject
router.delete('/subject/:id', async (req, res) => {
    try {
        const deleteSub = await subject.findByIdAndDelete(req.params.id)
        if (!deleteSub) {
            return res.status(404).json({ message: 'Subject not found' })
        }
        res.status(200).json({ message: 'deleted Subject successful' })
    } catch {
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router;