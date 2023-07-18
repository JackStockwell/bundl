const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.post('/create', async (req, res) => {

  console.log(req.session)
  
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_id = true;
      
      res.status(200).json(userData)
    });

    if (!userData) {
      return res.status(404).json({
        message: "Post not found",
      })
    }
    
    res.status(200).json(userData)
      
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const dbData = await User.findOne({
      where: {
        email: req.body.email,
      },
      plain: true,
    });

    if (!dbData) {
      res.status(400).json({ 
          message: 'Incorrect email or password. Please try again!'
      });
      return;
    }

    const validPassword = await dbData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ 
          message: 'Incorrect email or password. Please try again!'
      });
      return;
    }

    console.log(validPassword)

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbData.id;

      console.log(req.session)

      res.status(200).json({
        user: dbData, message: 'You are now logged in!'
      });
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;