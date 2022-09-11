const router = require("express").Router();

const petRoutes = require("./pet-routes.js");
const postRoutes = require("./post-routes");
// const commentRoutes = require('./comment-routes');

router.use("/pets", petRoutes);
router.use("/posts", postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
