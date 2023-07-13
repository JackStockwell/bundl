const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const forumData = await Forum.findAll({
        include: [
            {model: Post}
        ],
      });
  
      if (!forumData) {
        return res.status(404).json({
          message: "Post not found",
        })
      }
      
      res.status(200).json(forumData)
        
    } catch (err) {
      return res.status(500).json(err)
    }
});

router.post('/:name/follow/', async (req, res) => {

  console.log(req.params)

    try {
      const forumData = await Forum.findOne({
        where: {name: req.params.name}
      })

      if (!forumData) {
        return res.status(404).json({
          message: "Forum not found",
        })
      }

      const newFollow = {
        user_id: res.session.id,
        forum_id: forumData.id,
      }

      console.log(newFollow)

      const updateForum = await UserForum.create(newFollow, {
        
      })

      res.status(200).json(forumData)

      } catch (err) {
        return res.status(500).json(err)
      }
})

module.exports = router;

