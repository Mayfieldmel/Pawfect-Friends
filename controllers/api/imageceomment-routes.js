const router = require("express").Router();
const { Imagecomment } = require("../../models");
const withAuthSign = require("../../utils/auth");

// GET api/imagecomment
router.get("/", (req, res) => {
  Imagecomment.findAll()
    .then((dbImageCommentData) => res.json(dbImageCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST api/imagecomment
router.post("/", (req, res) => {
    Imagecomment.create({
      comment_text: req.body.comment_text,
      image_id: req.body.image_id,
      pet_id: req.session.pet_id,
    })
      .then((dbImageCommentData) => res.json(dbImageCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});


// DELETE api/imagecomment/1
router.delete("/:id", (req, res) => {
  Imagecomment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbImageCommentData) => {
      if (!dbImageCommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbImageCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;