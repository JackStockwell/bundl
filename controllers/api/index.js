const router = require('express').Router();
const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');
const postRoutes = require('./post-routes')
const devRoutes = require('./dev-routes')
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/subs', forumRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes)
router.use('/dev', devRoutes);

module.exports = router;
