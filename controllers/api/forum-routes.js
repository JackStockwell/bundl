const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

// Gets all forums on the database. All of their posts and users.
router.get('/', async (req, res) => {
    try {
      const forumData = await Forum.findAll({
        include: [
            {model: Post},
            {model: User}
        ],
      });
  
      if (!forumData) {
        return res.status(404).json({
          message: "No forums on the database!",
        })
      }
      
      res.status(200).json(forumData)
        
    } catch (err) {
      return res.status(500).json(err)
    }
});

// Makes a new Forum, with the parsed infomation.
router.post('/new', async (req, res) => {
  
  try {
    const forumData = await Forum.create({
      name: req.body.name,
      description: req.body.description
    });

    res.status(200).json(forumData)

  } catch (err) {
    res.status(500).json({err})
  }
})

// Follow request, creates a new link between the user and forum.
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

    const updateForum = await UserForum.create(newFollow)
    
    res.status(200).json(updateForum)

    } catch (err) {
      return res.status(500).json(err)
    }
  } 
)

module.exports = router;