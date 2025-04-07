const express = require('express');
const router = express.Router();
const Structure = require('../../../models/Course/Structure');
const Curriculum = require('../../../models/Course/Curriculum');

router.post('/structure', async (req, res) => {
    try {
        const { curriculumId, courseId, categories } = req.body;

        // ตรวจสอบว่า Curriculum มีอยู่จริง
        const existingCurriculum = await Curriculum.findById(curriculumId);
        if (!existingCurriculum) {
            return res.status(404).json({ message: "Curriculum not found" });
        }

        const existingStructure = await Structure.findOne({ curriculumId, courseId });
        if (existingStructure) {
            return res.status(400).json({ message: "Course already exists in this curriculum" });
        }

        // สร้าง Structure ใหม่
        const newStructure = new Structure({
            curriculumId,
            courseId,
            categories
        });

        await newStructure.save();

        res.status(201).json({ message: "Structure created successfully", structure: newStructure });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

//post category
router.post('/structure/:structureId/category', async (req, res) => {
    try {
        const { categoryId } = req.body;
        const { structureId } = req.params;

        const structure = await Structure.findById(structureId);
        if (!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        // 🔹 Check if Category already exists in Structure
        const categoryExists = structure.categories.some(cat => cat.categoryId === categoryId);
        if (categoryExists) {
            return res.status(400).json({ message: "Category already added" });
        }

        const updatedStructure = await Structure.findByIdAndUpdate(
            structureId,
            { $push: { categories: { categoryId, groups: [] } } },
            { new: true }
        );

        res.json({ message: "Category added successfully", structure: updatedStructure });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});


//post group
router.post('/structure/:structureId/category/:categoryId/group', async (req, res) => {
    try {
        const { groupId } = req.body;
        const { structureId, categoryId } = req.params;

        const structure = await Structure.findById(structureId);
        if(!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        const groupExistsAnywhere = structure.categories.some(cat =>
            cat.groups.some(group => group.groupId === groupId)
        );

        if (groupExistsAnywhere) {
            return res.status(400).json({ message: "Group already used in this structure" });
        }

        // อัปเดต Structure โดยเพิ่ม group ใหม่เข้าไปใน categories ที่ตรงกับ categoryId
        const updatedStructure = await Structure.findOneAndUpdate(
            { _id: structureId, "categories.categoryId": categoryId },
            { $push: { "categories.$.groups": { groupId, subjects: [] } } },
            { new: true }
        );

        res.json({ message: "Group added successfully", structure: updatedStructure });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

//post subject
router.post('/structure/:structureId/category/:categoryId/group/:groupId/subject', async (req, res) => {
    try {
        const { subjectId } = req.body;
        const { structureId, categoryId, groupId } = req.params;

        const structure = await Structure.findById(structureId);
        if (!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        const category = structure.categories.find(cat => cat.categoryId.toString() === categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const group = category.groups.find(g => g.groupId.toString() === groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        const subjectExistsAnywhere = structure.categories.some(category =>
            category.groups.some(group =>
                group.subjects.some(subject =>
                    subject.subjectId.toString() === subjectId
                )
            )
        );
        
        if (subjectExistsAnywhere) {
            return res.status(400).json({ message: "Subject already exists in this structure" });
        }

        const updatedStructure = await Structure.findOneAndUpdate(
            { _id: structureId, "categories.categoryId": categoryId, "categories.groups.groupId": groupId },
            { $push: { "categories.$[category].groups.$[group].subjects": { subjectId } } },
            {
                new: true,
                arrayFilters: [
                    { "category.categoryId": categoryId },
                    { "group.groupId": groupId }
                ]
            }
        );
        

        res.json({ message: "Subject added successfully", structure: updatedStructure });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;