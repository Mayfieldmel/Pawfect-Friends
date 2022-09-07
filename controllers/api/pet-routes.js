const router = require("express").Router();
const { Pet, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// GET api/pet
router.get("/", (req, res) => {
  // get all Pets
  Pet.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET api/pet/1
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
        attributes: ["pet_name"],
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

// POST api/pet
router.post("/", (req, res) => {
  // create pet account
  Pet.create({
    pet_name: req.body.Petname,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbPetData) => {
      req.session.save(() => {
        req.session.Pet_id = dbPetData.id;
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

// POST api/pet/login
router.post("/login", (req, res) => {
  // get single pet
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
      req.session.Pet_id = dbPetData.id;
      req.session.Petname = dbPetData.Petname;
      req.session.loggedIn = true;

      res.json({ Pet: dbPetData, message: "You are now logged in!" });
    });
  });
});

// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

// router.put("/:id", (req, res) => {
//   // expects {Petname: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

//   // pass in req.body instead to only update what's passed through
//   Pet.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbPetData) => {
//       if (!dbPetData) {
//         res.status(404).json({ message: "No Pet found with this id" });
//         return;
//       }
//       res.json(dbPetData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete("/:id", withAuth, (req, res) => {
//   Pet.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbPetData) => {
//       if (!dbPetData) {
//         res.status(404).json({ message: "No Pet found with this id" });
//         return;
//       }
//       res.json(dbPetData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
