const router = require("express").Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const imageRoutes = require('./image-routes.js');
const profileRoutes = require('./profile-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/img', imageRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
