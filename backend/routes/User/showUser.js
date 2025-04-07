const express = require('express')
const router = express.Router();
const user = require('../../models/User/User')

// show all users
router.get('/users', async (req, res) => {
    // let { page = 1, limit = 10 } = req.query
    // page = parseInt(page)
    // limit = parseInt(limit)

    // const offset = (page - 1) * limit

    try {
        const users = await user.find();
        // const users = await user.find().skip(offset).limit(limit)
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;