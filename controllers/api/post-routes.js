const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

// POST method for making a forum Post. 
// Takes the forum it was posted on, and the user that posted it. As well as the title and content.
router.post('/', async (req, res) => {

    try {
        // New post object.
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            forum_id: req.body.forum_id,
            user_id: req.session.user_id
        }

        if (!newPost) {
            res.status(401).json({
                message: "Missing post content."
            })
        }

        const postData = await Post.create(newPost);

        res.status(200).json(postData)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;