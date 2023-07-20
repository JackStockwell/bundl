const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');
const { findAll } = require('../../models/User');

router.get('/user', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {model: Post},
                {model: Forum}
            ]
        });

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post', async (req, res) => {
    try {
        const userData = await Post.findAll();

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;