const router = require('express').Router();
const { User, Post, Forum, UserForum, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        console.log(commentData)

        // const comments = commentData.map((comment) => comment.toJSON())
        
        console.log(comments)

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err)
        return
    }
})

router.post('/', async (req, res) => {
    try {
        const newComment = {
            comment: req.body.comment,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }
    
        const commentData = await Comment.create(newComment)

        console.log(commentData)
    
        const comments = commentData.toJSON();
    
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err)
        return
    }


})

module.exports = router;