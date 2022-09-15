const router = require("express").Router();
const { Post, Pet, Comment, Image, Imagecomment } = require("../models");
const sortArray = require("sort-array");
// const withAuth = require("../utils/auth");

//   GET /profile/
router.get("/", async (req, res) => {
  console.log("session data", req.session);
  console.log("======================");
  // get all posts & images for dashboard
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_text", "created_at"],
      include: [
        {
          model: Pet,
          attributes: ["pet_name", "profile_pic"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "pet_id", "created_at"],
          include: {
            model: Pet,
            attributes: ["pet_name"],
          },
        },
      ],
      order: [["created_at", "DESC"]],
      raw: true,
    });
    const imgData = await Image.findAll({
      attributes: ["id", "image", "created_at"],
      include: [
        {
          model: Pet,
          attributes: ["pet_name"],
        },
        {
          model: Imagecomment,
          attributes: ["id", "comment_text"],
          include: {
            model: Pet,
            attributes: ["pet_name"]
          }
        }
      ],
      order: [["created_at", "DESC"]],
      raw: true,
    });
    
    const combinedArr = [
      ...postData.map((post) => ({
        ...post,
        profile_pic: post["pet.profile_pic"],
        pet_name: post["pet.pet_name"],
      })),
      ...imgData,
    ];
    const dataArr = sortArray(combinedArr, {
      by: "created_at",
      order: "desc",
    });

    res.render("dashboard", {
      dataArr: dataArr,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
