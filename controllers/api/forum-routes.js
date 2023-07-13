const router = require('express').Router();
const { User, Post, Forum } = require('../../models');

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

module.exports = router;

