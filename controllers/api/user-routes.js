const router = require('express').Router();
const { User, Post, Forum, UserForum } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_id = true;

        res.status(200).json(userData);
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
    try {
      const dbData = await User.findOne({
        where: {
          email: req.body.email,
        },
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
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = dbData.id
  
        res.status(200).json({
            user: dbData, message: 'You are now logged in!'
        });

      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



module.exports = router;