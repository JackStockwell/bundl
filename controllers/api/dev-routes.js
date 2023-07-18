const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');
const { findAll } = require('../../models/User');

router.get('/user', async (req, res) => {
    try {
        const userData = await User.findAll();

        res.status(200).json(userData)
    } catch (err) {

    }
})


module.exports = router;