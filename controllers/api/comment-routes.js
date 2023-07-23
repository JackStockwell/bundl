const router = require('express').Router();
const { User, Post, Forum, UserForum, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        console.log(commentData)

        const comments = commentData.map((comment) => comment.toJSON())

        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
        return
    }
})

router.post('/:id', async (req, res) => {
    try {
        const newComment = {
            comment: req.body.comment,
            post_id: req.params.id,
            user_id: 1
        }
    
        const commentData = await Comment.create(newComment)
    
        const comments = commentData.toJSON();
    
        console.log(comments)
    
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
        return
    }


})

module.exports = router;