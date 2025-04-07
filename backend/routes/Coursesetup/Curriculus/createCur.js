const express = require('express');
const router = express.Router();
const curriculum = require('../../../models/Course/Curriculum')

router.post('/curriculum', async (req, res) => {
    try {
        const {curriculumnameTH, curriculumnameEN, description} = req.body;

        if(!curriculumnameTH || !curriculumnameEN) {
            return res.status(400).json({message: 'Please enter curriculus name'})
        }

        const newCurriculum = new curriculum({
            curriculumnameTH,
            curriculumnameEN,
            description,
        })

        await newCurriculum.save();

        res.status(201).json({message: 'Curriculum created successfully'})

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message})
    }
})

module.exports = router;