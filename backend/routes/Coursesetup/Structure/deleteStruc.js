const express = require('express');
const router = express.Router();
const Structure = require('../../../models/Course/Structure');

//delete course in structure
router.delete('/structure/:structureId', async (req, res) => {
    try {
        const { structureId } = req.params;

        const structure = await Structure.findById(structureId);
        if(!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        await Structure.findByIdAndDelete(structureId);

        res.json({ message: "Course deleted successfully", structure });

    } catch (error) {

    }
})

//delete category in Structure
router.delete('/structure/:structureId/category/:categoryId', async (req, res ) => {
    try {
        const { structureId, categoryId } = req.params;

        const structure = await Structure.findById(structureId);
        if (!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        const categoryIndex = structure.categories.findIndex(cat => cat.categoryId.toString() === categoryId);
        if(categoryId === -1) {
            return res.status(404).json({ message: "Category not found" });
        }

        structure.categories.splice(categoryIndex, 1);

        await structure.save();

        res.json({ message: "Category deleted successfully", structure });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

//delete group in Structure
router.delete('/structure/:structureId/category/:categoryId/group/:groupId', async (req, res) => {
    try {
        const { structureId, categoryId, groupId } = req.params;

        const structure = await Structure.findById(structureId);
        if (!structure) {
            return res.status(404).json({ message: "Structure not found" });
        }

        const category = structure.categories.find(cat => cat.categoryId.toString() === categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const groupIndex = category.groups.findIndex(g => g.groupId.toString() === groupId);
        if (groupIndex === -1) {
            return res.status(404).json({ message: "Group not found in this category" });
        }

        category.groups.splice(groupIndex, 1);

        await structure.save();

        res.json({ message: "Group deleted successfully", structure });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});


//delete subject in structure
router.delete('/structure/:structureId/category/:categoryId/group/:groupId/subject/:subjectId', async (req, res) => {
    try {
        const { structureId, categoryId, groupId, subjectId } = req.params;

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

        const subjectIndex = group.subjects.findIndex(sub => sub.subjectId.toString() === subjectId);
        if (subjectIndex === -1) {
            return res.status(404).json({ message: "Subject not found in this group" });
        }

        group.subjects.splice(subjectIndex, 1);

        await structure.save();

        res.json({ message: "Subject deleted successfully", structure });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;