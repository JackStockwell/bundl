const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.post('/', async (req, res) => {
    console.log(req.session)
    console.log(req.body)
    try {

        const newPost = {
            title: req.body.title,
            content: req.body.content,
            forum_id: req.body.forum_id,
            user_id: req.session.user_id
        }

        const postData = await Post.create(newPost);

        res.status(200).json(postData)
        
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router;