const express = require('express');
const group = require('../../../models/Course/Group');


const router = express.Router();

router.post('/group', async (req, res) => {
    try {
        const { groupnameTH, groupnameEN } = req.body;

        if (!groupnameTH || !groupnameEN) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingGroup = await group.findOne({ groupnameTH, groupnameEN });
        if (existingGroup) {
            return res.status(400).json({ message: 'Group name already exists' });
        }

        const newGroup = new group({
            groupnameTH,
            groupnameEN,
        });

        await newGroup.save();

        res.status(201).json({ message: 'Group created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;