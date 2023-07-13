// Imports

const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes')

// Routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;