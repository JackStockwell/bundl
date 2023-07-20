const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Forum, UserForum } = require('../models');

router.get('/', withAuth, async (req, res) => {

  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id
      },
      include: Forum
    });

    const user = userData.toJSON();

    const postData = await Post.findAll({
      include: [
        {model: Forum},
        {model: User}
      ],
      order: [['date_created', 'DESC']],
      where: {
        forum_id: user.forums.map((forum) => forum.id),
      }
    });

    const posts = postData.map((post) => post.toJSON());


    res.render('home',
      {user, posts, logged_in: req.session.logged_in}
    )

    // res.status(200).json(posts)

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/profile/:name', withAuth, async (req, res) => {

  try {
    const userData = await User.findOne({
      where: {username: req.params.name},
      attributes: ['id', 'username'],
      include: [
        {
          model: Post,
          include: [
            Forum
          ]
        }
      ]
    })

    const user = userData.toJSON()
    const posts = userData.posts.map((post) => post.toJSON())

    if (!userData) {
      return res.status(404).json({
        message: "No profile found",
      })
    }

    res.render(
      'profile',
      {user, posts, logged_in: req.session.logged_in}
      )
    

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/b/:name', withAuth, async (req, res) => {

  try {
    const namedForum = await Forum.findOne({
      where: { 
        name: req.params.name 
      },
      include: [
        {
          model: Post,
          include: [
            User
          ]
        }
      ]
    });

    if (!namedForum) {
      return res.status(404).json({
        message: "Error 404"
      })
    }
    
    const forum = namedForum.toJSON();
    const posts = namedForum.posts.map((post) => post.toJSON())

    console.log(forum)
    console.log(posts)

    res.render('forum', {
      forum,
      user_id: req.session.user_id,
      forum_id: namedForum.id,
      logged_in: req.session.logged_in
    })
    

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: (err)
    })
  }
});

router.get('/b/:name/:post', async (req, res) => {
  const params = {
    name: req.params.name,
    id: req.params.post
  }
  console.log(params)
  try {
    const activePost = await Post.findOne({
      where: {
        id: params.id
      }
    })
  
    res.status(200).json(activePost)
  } catch (err) {
    res.status(500).json({
      message: "Whoops! Something went wrong..."
    })
  }
});

router.get('/welcome', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('welcome');
});


module.exports = router;