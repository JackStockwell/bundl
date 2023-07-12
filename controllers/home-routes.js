const router = require('express').Router();
const { User, Post, String } = require('../models');



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

module.exports = router;