const router = require("express").Router();
const { Post, Pet, Comment } = require("../models");
// const withAuth = require("../utils/auth");

// get all posts for dashboards
router.get("/", (req, res) => {
  console.log(req.session);

  console.log("======================");
  Post.findAll({
    where: {
      pet_id: req.session.pet_id,
    },
    attributes: ["id", "post_text", "title", "created_at"],
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
        attributes: ["pet_name", "email", "password"],
      },
    ],
    // order: [["created_at", "DESC"]],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      console.log(posts);

      res.render("profile", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/edit/:id", withAuth, (req, res) => {
//     Post.findByPk(req.params.id, {
//       attributes: ["id", "post_content", "title", "created_at"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     })
//       .then((dbPostData) => {
//         if (dbPostData) {
//           const post = dbPostData.get({ plain: true });

//           res.render("edit-post", {
//             post,
//             loggedIn: true,
//           });
//         } else {
//           res.status(404).end();
//         }
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   });

//   router.get("/new", withAuth, (req, res) => {
//     res.render("new");
//   });

module.exports = router;
