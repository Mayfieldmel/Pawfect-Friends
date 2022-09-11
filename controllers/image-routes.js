const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Pet, Comment, Friend, Image } = require('../models');



// // GET /img
// router.get("/", (req, res) => {
//     // get all Pets
    
//         res.render('image', { loggedIn: true });
    
//   });
 
// GET /img/display  
router.get("/display", (req, res) => {
    //GET ALL IMAGES
    Image.findAll({})
        .then((dbImageData) => res.json(dbImageData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  });

// GET /img/profile/display/1  
router.get("/profile/display/:id", (req, res) => {
    // GET ALL IMAGES FROM ONE PET
    Image.findALl({
      where: {
        pet_id: req.params.id
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

// GET /img/display/1  
router.get("/display/:id", (req, res) => {
    // GET ONE IMAGE
    Image.findOne({
      where: {
        id: req.params.id
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

// GET /img/display/1  
router.get("/display/:id", (req, res) => {
    // GET PROFILE PIC
    Image.findOne({
      where: {
        pet_id: req.params.id,
        profile_pic: true
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

// POST /img
router.post('/', (req, res) => {
  // CREATE IMAGE
    Image.create({
        image: req.body.image,
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        profile_pic: req.body.profile_pic
    })
    .then((dbPetData) => {
        res.json(dbPetData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})
    

  module.exports = router; 