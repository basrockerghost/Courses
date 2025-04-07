const express = require('express');
const router = express.Router();
const Structure = require('../../../models/Course/Structure')

router.get('/structures', async (req, res) => {
    try {
        // const structures = await Structure.find().populate({
        //     path: 'categories.categoryId',
        //     model: 'Category'
        // }).populate({
        //     path: 'categories.groups.groupId',
        //     model: 'Group'
        // }).populate({
        //     path: 'categories.groups.subjects.subjectId',
        //     model: 'Subject'
        // }).populate({
        //     path: 'courseId',
        //     model: 'Course'
        // });

        const structures = await Structure.find();

        res.json(structures);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;

