const router = require('express').Router();
const { User, Post, Forum } = require('../models');



router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll();

    if (!postData) {
      return res.status(404).json({
        message: "Post not found",
      })
    }
    
    res.status(200).json(postData)
      
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/b/:name', async (req, res) => {

  console.log(req.params)
  try {
    const namedForum = await Forum.findOne({
      where: { name: req.params.name },
      include: [
        { model: Post }
      ]
    })

    if (!namedForum) {
      return res.status(404).json({
        message: "Error 404"
      })
    }

    res.status(200).json(namedForum)
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: (err)
    })
  }
})

module.exports = router;