const express = require('express')
const router = express.Router();
const user = require('../../models/User/User')

//delete user
router.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;
