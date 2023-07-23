const router = require('express').Router();
const { User, Post, Forum, UserForum, Comment } = require('../../models');

// POST method request. Creates a newcomment with the parsed body info.
router.post('/', async (req, res) => {
    try {
        const newComment = {
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }
    
        const commentData = await Comment.create(newComment)

        const comments = commentData.toJSON();
    
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
        return
    }
})

module.exports = router;