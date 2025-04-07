const express = require('express')
const router = express.Router();
const category = require('../../../models/Course/Category')

router.patch('/category/:id', async (req, res) => {
    try {
        const updateCat = await category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updateCat) {
            return res.status(404).json({message: 'Category not found'})
        }
        res.status(200).json({
            message: 'Category updated successfully',
            data: updateCat
        })
    } catch {
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = router;