const express = require('express')
const Category = require('../../../models/Course/Category')
const mongoose = require('mongoose');

const router = express.Router();

//show all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error: error.message });
    }
});

module.exports = router;