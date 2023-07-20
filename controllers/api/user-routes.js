const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');
const { uploadAvatar, s3 } = require('../../middleware/awsconnect.js')

router.post('/create', async (req, res) => {
  
  try {
    const userData = await User.create(req.body);

    if (!userData) {
      return res.status(404).json({
        message: "Post not found",
      })
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_id = true;

      res.status(200).json({
        user: userData, message: 'Account successfully created!'
      });
    });

  } catch (err) {
    return console.log(res.status(500).json(err))
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

    // Checks to see if a user was found
    if (!dbData) {
      res.status(400).json({ 
          message: 'Incorrect email or password. Please try again!'
      });
      return;
    }

    // Checks the password is correct using bcrypt
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

      res.status(200).json({
        user: dbData, message: 'You are now logged in!'
      });
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/avatar', uploadAvatar.single('bundl-blog'), async (req, res) => {
  console.log(req.file)
  
  res.send('Upload complete')
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;