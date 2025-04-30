const mongoose = require('mongoose');
const User = require('../models/User/User'); // path ไปยัง user model ของคุณ

async function addStudentToTeacher(teacherId, studentId) {
    try {
        const teacher = await User.findById(teacherId);
        const student = await User.findById(studentId);

        if (!teacher || !student) {
            throw new Error('Teacher or student not found');
        }

        if (teacher.role !== 'teacher') {
            throw new Error('This user is not a teacher');
        }

        // ตรวจสอบว่าซ้ำหรือยัง
        const alreadyAdded = teacher.students.some(s => s.studentsId.toString() === studentId);
        if (alreadyAdded) {
            throw new Error('Student already assigned to this teacher');
        }

        teacher.students.push({ studentsId: student._id });
        await teacher.save();

        return { success: true, message: 'Student added to teacher successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

module.exports = addStudentToTeacher;
