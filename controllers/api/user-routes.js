const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');
const withAuth = require('../../utils/helpers')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')

// Creates a new user, with the email, username and password parsed.
router.post('/create', async (req, res) => {
  
  try {
    const userData = await User.create(req.body);

    // Ensure post is found.
    if (!userData) {
      return res.status(404).json({
        message: "Post not found",
      })
    }

    // Saves the session token.
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

// Login post request.
router.post('/login', async (req, res) => {
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

    // Logs the user in, saves it in session.
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
// Multer set-up to save an uploaded picture.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/avatar-uploads")
  },
  filename: (req, file, cb) => {
    const fileType = file.originalname.split('.').slice(-1)[0]
    cb(null, `${uuidv4()}-.${fileType}`)
  }
})

// Multer upload object.
const upload = multer({ 
  storage: storage,
  // Filter to ensure image files only
  fileFilter: (req, file, cb) => {
    console.log(file.fieldname)
    if(!file.fieldname === 'image') {
      return cb(new Error('Only images are allowed'))
    } else {
      cb(null, true)
    }
  },
  limits:
    {fileSize: 4000000} 
})

// Posts the filename to the database. Allowing the front end to find it once parsed in.
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
    res.redirect(req.get('referer'));
  }
})

// Logout, destroys the session token.
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