const router = require('express').Router();
const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');
const postRoutes = require('./post-routes')

router.use('/users', userRoutes);
router.use('/subs', forumRoutes);
router.use('/post', postRoutes);

module.exports = router;
