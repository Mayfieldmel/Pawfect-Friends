const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Pet, Comment, Friend, Image } = require('../models');



// GET /img
router.get("/", (req, res) => {
    // get all Pets
    
        res.render('image', { loggedIn: true });

    
  });
 
// GET /img/display  
router.get("/display", (req, res) => {
    // get all images
    Image.findAll({})
        .then((dbImageData) => res.json(dbImageData))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
        
    
  });

// POST /img
router.post('/', (req, res) => {
    Image.create({
        image: req.body.image,
        name: req.body.name,
        type: req.body.type,
        size: req.body.size
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