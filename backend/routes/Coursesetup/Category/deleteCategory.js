const express = require('express')
const router = express.Router();
const category = require('../../../models/Course/Category')

router.delete('/category/:id', async (req, res) => {
    try {
        const deleteCat = await category.findByIdAndDelete(req.params.id)
        if(!deleteCat) {
            return res.status(404).json({message:'Category not found'})
        }
        res.status(200).json({message: 'deleted Category successful'})
    } catch {
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router;