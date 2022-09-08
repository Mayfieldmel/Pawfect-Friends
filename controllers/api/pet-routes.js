const router = require("express").Router();
const { Pet, Post, Comment, Friend } = require("../../models");
// const withAuth = require("../../utils/auth");


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
        attributes: ["pet_name"],
        through: Friend,
        as: "friends"
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
router.put("/friend/:id", (req, res) => {
  // edit pet info
  Pet.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
  .then((pet) => {
    // find all associated friends from Friend
    return Friend.findAll({ where: { pet_id: req.params.id } });
  })
  .then((friendsIds) => {
    // get list of current friend_ids
    const friendIds = friendsIds.map(({ friend_id }) => friend_id);
    // create filtered list of new friend_ids
    const newFriends = req.body.friends
      .filter((friend_id) => !friendIds.includes(friend_id))
      .map((friend_id) => {
        return {
          pet_id: req.params.id,
          friend_id,
        };
      });
    // figure out which ones to remove
    const friendsToRemove = friendsIds
      .filter(({ friend_id }) => !req.body.friends.includes(friend_id))
      .map(({ id }) => id);

    // run both actions
    return Promise.all([
      Friend.destroy({ where: { id: friendsToRemove } }),
      Friend.bulkCreate(newFriends),
    ]);
  })
  .then((updatedFriends) => res.json(updatedFriends))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });
});

// // // PUT api/pets/friend/1
// router.put("/friend/:id", (req, res) => {
//   // edit pet info
//   Pet.update({
//     individualHooks: true,
//     attributes: ['friends'],
//     where: {
//       id: req.params.id,
//     },
//   })

// })

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
