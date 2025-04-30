// post std to teacher
const express = require('express');
const router = express.Router();
const addStudentToTeacher = require('../../controller/addStdToTeacher');

router.patch('/teacher/:teacherId/add-student', async (req, res) => {
    const { teacherId } = req.params;
    const { studentId } = req.body;

    const result = await addStudentToTeacher(teacherId, studentId);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

module.exports = router;