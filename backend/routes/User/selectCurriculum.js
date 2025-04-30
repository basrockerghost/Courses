// select Curriculum
const express = require('express');
const router = express.Router();
const User = require('../../models/User/User');

router.patch('/user/:userId/curriculum', async (req, res) => {
    
    try {
        const { userId} = req.params;
        const { curriculumId } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
                { curriculumId: curriculumId },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({
            message: 'Curriculum updated successfully',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  
});

module.exports = router;