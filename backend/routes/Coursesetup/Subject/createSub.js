const express = require('express');
const subject = require('../../../models/Course/Subject');

const router = express.Router();

router.post('/subject', async (req, res) => {
    try {
        const { subjectID, subjectnameTH, subjectnameEN, credits, description } = req.body;

        if(!subjectID || !subjectnameTH || !subjectnameEN || !credits || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingSubject = await subject.findOne({ subjectID });
        if(existingSubject) {
            return res.status(400).json({ message: 'Subject ID already exists' });
        }

        const newSubject = new subject({
            subjectID,
            subjectnameTH,
            subjectnameEN,
            credits,
            description,
        });

        await newSubject.save();

        res.status(201).json({ message: 'Subject created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router;