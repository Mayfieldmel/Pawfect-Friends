const router = require("express").Router();
const { Pet, Post, Comment, Friend } = require("../../models");
// const withAuth = require("../../utils/auth");

// // PUT api/friend/1
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
  
  // POST api/pets
  router.post('/', (req, res) => {
    // create pet account
    Friend.create({
      pet_id: req.body.pet_id,
      friend_id: req.body.friend_id,
    })
    .then((dbPetData) => {
        console.log("line 72", dbPetData)
        if (req.body.friends && req.body.friends.length) {
          const friendsArr = req.body.friends.map((friend_id) => {
            return {
              pet_id: dbPetData.id,
              friend_id,
            };
          });
          console.log("pre-bulkCreate", friendsArr)
          return Friend.bulkCreate(friendsArr)
        }
        res.status(200).json(dbPetData);
        // req.session.save(() => {
        //   console.log("in req.session.save")
        //   req.session.id = dbPetData.id;
        //   req.session.pet_name = dbPetData.pet_name;
        //   req.session.loggedIn = true;
  
          
        // });
      })
      .then((friends) => res.status(200).json(friends))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;