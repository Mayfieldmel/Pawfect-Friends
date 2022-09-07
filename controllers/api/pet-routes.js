const router = require("express").Router();
const { Pet, Post, Comment } = require("../../models");
const Friend = require("../../models/Friend");
const withAuth = require("../../utils/auth");


// GET api/pets
router.get("/", (req, res) => {
  // get all Pets
  Pet.findAll({
    attributes: { exclude: ["password"] }
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET api/pets/1
router.get("/:id", (req, res) => {
  // get single pet
  Pet.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Pet,
        attributes: ["id", "pet_name"],
        through: Friend,
        as: "friend_id"
      },
      {
        model: Post,
        attributes: ["id", "title", "post_img", "post_text", "created_at"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No Pet found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST api/pets
router.post("/", (req, res) => {
  // create pet account
  Pet.create({
    pet_name: req.body.pet_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbPetData) => {
      req.session.save(() => {
        req.session.id = dbPetData.id;
        req.session.pet_name = dbPetData.pet_name;
        req.session.loggedIn = true;

        res.json(dbPetData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST api/pets/login
router.post("/login", (req, res) => {
  // get single pet with requested email
  Pet.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbPetData) => {
    if (!dbPetData) {
      res.status(400).json({ message: "No Pet with that email address!" });
      return;
    }
    // check for correct password
    const validPassword = dbPetData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // create session
    req.session.save(() => {
      req.session.id = dbPetData.id;
      req.session.pet_name = dbPetData.pet_name;
      req.session.loggedIn = true;

      res.json({ Pet: dbPetData, message: "You are now logged in!" });
    });
  });
});

// POST api/pets/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // end session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT api/pets/1
router.put("/:id", (req, res) => {
  // edit pet info
  Pet.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No Pet found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // PUT api/pets/friend/1
// router.put("/friend/:id", (req, res) => {
//   // edit pet info
//   Pet.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbPetData) => {
//       if (req.body.friend_id.length) {
//         const friendsArr = req.body.friend_id.map((friend) => {
//           return {
//             friend,
//           };
//         });
//         return Friend.bulkCreate(friendsArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((petData) => res.status(200).json(petData))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// DELETE api/pets/1
router.delete("/:id", (req, res) => {
  // remove pet info
  Pet.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPetData) => {
      if (!dbPetData) {
        res.status(404).json({ message: "No Pet found with this id" });
        return;
      }
      res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
