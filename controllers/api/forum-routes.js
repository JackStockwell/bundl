const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const forumData = await Forum.findAll({
        include: [
            {model: Post},
            {
              model: User,
              where: {
                
              }
            }
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

router.post('/new', async (req, res) => {
  
  try {
    console.log(req.body)

    const forumData = await Forum.create({
      name: req.body.name,
      description: req.body.description
    });

    if (!forumData) {

    }

    res.status(200).json(forumData)

  } catch (err) {
    res.status(500).json({err})
  }

})

router.post('/follow', async (req, res) => {

  if (!req.body.forum_id || !req.session.user_id) {
    return res.status(404).json({
      message: "Forum not found",
    })
  }

  try {

    const newFollow = {
      user_id: req.session.user_id,
      forum_id: req.body.forum_id,
    }

    console.log(newFollow)

    const updateForum = await UserForum.create(newFollow)
    
    console.log(updateForum)
    
    res.status(200).json(updateForum)

    } catch (err) {
      return res.status(500).json(err)
    }
  } 
)

module.exports = router;

