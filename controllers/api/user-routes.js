const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');
const withAuth = require('../../utils/helpers')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')

router.post('/create', async (req, res) => {
  
  try {
    const userData = await User.create(req.body);

    if (!userData) {
      return res.status(404).json({
        message: "Post not found",
      })
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;

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

// AVATAR PIC

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/avatar-uploads")
  },
  filename: (req, file, cb) => {
    const fileType = file.originalname.split('.').slice(-1)[0]
    cb(null, `${uuidv4()}-.${fileType}`)
  }
})

const upload = multer({ 
  storage: storage,
  limits:
    {fileSize: 4000000} 
  })

router.post('/upload/avatar', upload.single('image'), async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.status(401).send("You must be logged in to upload a file!")
    }

    const addAvatar = await User.update({avatar: req.file.filename}, {
      where: {
        id: req.session.user_id
      }
    })

    res.redirect(req.get('referer'));

  } catch (err) {
    res.status(500).json(err)
  }
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