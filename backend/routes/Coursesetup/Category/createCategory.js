const express = require('express');
const category = require('../../../models/Course/Category');

const router = express.Router();

// create category
router.post('/category', async (req, res) => {
    try {
        const { catnameTH, catnameEN } = req.body;

        if (!catnameTH || !catnameEN) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingCategory = await category.findOne({ catnameTH, catnameEN });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category name already exists' });
        }

        const newCategory = new category({
            catnameTH,
            catnameEN,
        });

        await newCategory.save();

        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router;