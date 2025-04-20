const express = require('express');
const router = express.Router();
const User = require('../../models/User/User');

// PATCH /remove/user/:userId/subject/:subjectId
router.patch('/user/:userId/subject/:subjectId', async (req, res) => {
    try {
      const { userId, subjectId } = req.params;
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { subjects: { subjectId } } },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;