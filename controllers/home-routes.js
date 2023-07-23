const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Forum, UserForum, Comment } = require('../models');

router.get('/', withAuth, async (req, res) => {
  console.log(req.session)

  // Finds a user based on the signed in 
  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Forum,
          attributes: ['id','name']
        }
      ]
    });

    const user = userData.toJSON();
    console.log(user)
    // 
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

    // Renders the home hb with the data parsed.
    res.render('home',
      {user, posts, logged_in: req.session.logged_in}
    )

    console.log(user)

    // res.status(200).json(user)

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/p/:name', withAuth, async (req, res) => {

  try {
    const userData = await User.findOne({
      where: {username: req.params.name},
      attributes: ['id', 'username', 'avatar'],
      include: [
        {
          model: Post,
          include: [
            {
              model: Forum,
              attributes: ['id','name']
            },
            {
              model: User,
              attributes: ['id','username', 'avatar']
            }
          ],
        },
        {
          model: Forum,
          attributes: ['id','name']
        }
      ],
      order: [[Post, 'date_created', 'DESC']],
    })

    if (!userData) {
      return res.status(404).json({
        message: "No profile found",
      })
    }

    const user = userData.toJSON()
    const posts = userData.posts.map((post) => post.toJSON())

    console.log(posts)

    res.render('profile', {
      user,
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
    

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
            {
              model: User,
              attributes: ['id', 'username', 'avatar'],
            },
            {
              model: Forum,
              attributes: ['id', 'name']
            }
          ],
        },
      ],
      order: [[Post, 'date_created', 'DESC']],
    });

    if (!namedForum) {
      return res.status(404).json({
        message: "Error 404"
      })
    }

    const userData = await User.findOne({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Forum,
          attributes: ['id','name']
        }
      ]
    });
    
    const user = userData.toJSON();
    const forum = namedForum.toJSON();

    res.render('forum', {
      forum,
      user,
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

router.get('/b/:name/:id', withAuth, async (req, res) => {

  try {
    // Active user. Used for logic in posting and follow mechanic
    const userData = await User.findOne({
      where: {id: req.session.user_id},
      attributes: ['id', 'username', 'avatar'],
      include: [
        {model: Forum}
      ]
    })

    const user = userData.toJSON();

    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: Forum},
        {model: User, attributes: ['id', 'username', 'avatar']}
      ]
    });

    const post = postData.toJSON()

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {model: User, attributes: ['id', 'username', 'avatar']}
      ]
    });

    console.log(commentData)

    if (commentData) {
      const comments = commentData.map((comment) => comment.toJSON())
      console.log(comments)
      res.render('post', {
        user,
        post,
        comments,
        logged_in: req.session.logged_in
      })
    } else {
      res.render('post', {
        user,
        post,
        logged_in: req.session.logged_in
      })
  
    }
    } catch (err) {
    res.status(500).json(err)
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