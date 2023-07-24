const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User, Post, Forum, UserForum, Comment } = require('../models');

// Loads the home page, which displays all the posts from where the user follows the sub.
router.get('/', withAuth, async (req, res) => {

  // Finds a user based on the signed in user_id. Includes the forums they're following.
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

    // Gets the post data from where the user is following.
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
    
    // Maps the post to json.
    const posts = postData.map((post) => post.toJSON());

    // Renders the home hb with the data parsed. Parses the logged in token.
    res.render('home',
      {user, posts, logged_in: req.session.logged_in}
    )

  } catch (err) {
    return res.status(500).json(err)
  }
});

// Loads a profile of a user, with all the posts they've made on the various sub-bundles.
router.get('/p/:name', withAuth, async (req, res) => {

  try {
    // Finds the user of params.
    const userData = await User.findOne({
      where: {username: req.params.name},
      attributes: ['id', 'username', 'avatar'],
      // Includes posts and the forums and users linked to those posts.
      include: [{
        model: Post,
        include: [{ 
          model: Forum,
          attributes: ['id','name']
        },
        {
          model: User,
          attributes: ['id','username', 'avatar']
        }],
        },
        // Includes forum for the aside render.
        {
          model: Forum,
          attributes: ['id','name']
        }
      ],
      order: [[Post, 'date_created', 'DESC']],
    })

    if (!userData) {
      return res.render('404')
    }

    const user = userData.toJSON()
    const posts = userData.posts.map((post) => post.toJSON())

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

// Loads a sub-bundl with all posts that users have posted.
router.get('/b/:name', withAuth, async (req, res) => {
  // Sub-bundl parsed from the params.
  try {
    const namedForum = await Forum.findOne({
      where: { 
        name: req.params.name 
      },
      // Includes all posts with the user and forum it was posted in.
      include: [{
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
      // Orders by newest first.
      order: [[Post, 'date_created', 'DESC']],
    });

    if (!namedForum) {
      return res.render('404')
    }

    // Usesd to generate the 'my bundles' aside.
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

// Loads the post, allowing the user to comment.
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

    if (!userData) {
      return res.render('404')
    }

    const user = userData.toJSON();

    // Finds the post that the user clicked on.
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

    // Finds all the comments for the selected post.
    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {model: User, attributes: ['id', 'username', 'avatar']}
      ]
    });

    // If there is comment data, it is render
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
      // Render without comment data
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

// Welcome re-direct. Allows the sign in and create account.
router.get('/welcome', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('welcome');
});


module.exports = router;