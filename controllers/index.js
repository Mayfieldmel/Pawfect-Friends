const router = require("express").Router();
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const profileRoutes = require("./profile-routes.js");

const apiRoutes = require("./api/");
const imageRoutes = require("./image-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/img", imageRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
