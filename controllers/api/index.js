const router = require("express").Router();

const petRoutes = require("./pet-routes.js");
const postRoutes = require("./post-routes");
const commentRoutes = require('./comment-routes');
const ImageCommentRoutes = require('./imageceomment-routes');

router.use("/pets", petRoutes);
router.use("/posts", postRoutes);
router.use('/comments', commentRoutes);
// router.use('/imagecomments', ImageCommentRoutes);

module.exports = router;
