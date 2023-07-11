// Imports

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')

// Routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;