const router = require('express').Router();
const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');
const postRoutes = require('./post-routes')
const devRoutes = require('./dev-routes')

router.use('/users', userRoutes);
router.use('/subs', forumRoutes);
router.use('/post', postRoutes);
router.use('/dev', devRoutes);

module.exports = router;
