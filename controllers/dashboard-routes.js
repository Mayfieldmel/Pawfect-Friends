const router = require("express").Router();
const { Post, Pet, Comment } = require("../models");
// const withAuth = require("../utils/auth");

// get all posts for dashboards
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: ["id", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "pet_id", "created_at"],
        include: {
          model: Pet,
          attributes: ["pet_name"],
        },
      },
      {
        model: Pet,
        attributes: ["pet_name"],
      },
    ],
    order: [["created_at", "DESC"]],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
