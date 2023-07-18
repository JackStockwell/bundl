const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.post('/', async (req, res) => {
    try {

        const newPost = {
            title: req.body.title,
            content: req.body.content,
        }

        const postData = await Post.create(newPost);
        
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;