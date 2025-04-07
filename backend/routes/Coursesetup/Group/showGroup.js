const express = require('express')
const group = require('../../../models/Course/Group')

const router = express.Router();

// show group
router.get('/groups', async (req, res) => {
    try {
        const groups = await group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;