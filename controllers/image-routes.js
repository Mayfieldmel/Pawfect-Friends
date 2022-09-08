const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Pet, Comment, Friend, Image } = require('../models');


const path = require("path")

// GET /img
router.get("/", (req, res) => {
    // get all Pets
    Pet.findAll()
      .then((dbPetData) => res.json(dbPetData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /img
router.post('/', (req, res) => {
    Image.create({
        image: req.body.image,
        image_name: req.body.image_name
    })
    .then((dbPetData) => res.json(dbPetData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
})
    

    