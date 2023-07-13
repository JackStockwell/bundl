const router = require('express').Router();
const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');

router.use('/users', userRoutes);
router.use('/subs', forumRoutes);

module.exports = router;
