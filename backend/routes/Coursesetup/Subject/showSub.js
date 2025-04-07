const express = require('express');
const subject = require('../../../models/Course/Subject')

const router = express.Router();

// show subject
router.get('/subjects', async (req, res) => {
    try {
        const subjects = await subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;