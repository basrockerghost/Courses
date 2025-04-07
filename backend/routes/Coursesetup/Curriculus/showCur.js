const express = require('express');
const router = express.Router();
const curriculum = require('../../../models/Course/Curriculum')

//show curriculum
router.get('/curriculums', async (req, res) => {
    try {
        const curriculums = await curriculum.find();
        res.json(curriculums)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong"})
    }
})

//show one curriculum
// router.get('/curriculums/:id', async (req, res) => {
//     try {
//         const curriculums = await curriculum.findById(req.params.id);
//         if (!curriculums) {
//             return res.status(404).json({ message: "Curriculum not found" });
//         }
//         res.json(curriculums)
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong"})
//     }
// })

module.exports = router;
