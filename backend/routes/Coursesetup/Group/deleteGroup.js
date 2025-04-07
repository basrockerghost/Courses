const express = require('express')
const router = express.Router();
const group = require('../../../models/Course/Group')

//delete group
router.delete('/group/:id', async (req, res) => {
    try {
        const deleteGroup = await group.findByIdAndDelete(req.params.id)
        if(!deleteGroup) {
            return res.status(404).json({message:'Group not found'})
        }
        res.status(200).json({message: 'deleted Group successful'})
    } catch {
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router;
