const express = require('express')
const router = express.Router();
const group = require('../../../models/Course/Group')

//edit group
router.patch('/group/:id', async (req, res) => {
    try {
        const updateGroup = await group.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updateGroup) {
            return res.status(404).json({message: 'Group not found'})
        }
        res.status(200).json({
            message: 'Group updated successfully',
            data: updateGroup
        })
    } catch {
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = router;
