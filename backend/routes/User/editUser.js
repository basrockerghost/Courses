const express = require('express')
const router = express.Router();
const user = require('../../models/User/User')

//edit user using patch
router.patch('/user/:id', async (req, res) => {
    try {
        const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;