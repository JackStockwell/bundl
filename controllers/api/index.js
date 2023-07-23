// Imports
const router = require('express').Router();
const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes')

// API Routes
router.use('/users', userRoutes);
router.use('/subs', forumRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes)

module.exports = router;
