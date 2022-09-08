const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Pet, Comment, Friend, Image } = require('../models');
const path = require("path")


const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// const image = (req, res) => {
//   return res.sendFile(path.join(`${__dirname}/../views/image.handlebars`));
// };
// module.exports = {
//   getHome: image
// };
//   router.get("/", homeController.getHome);
//   router.post("/upload", upload.single("file"), uploadController.uploadFiles);



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