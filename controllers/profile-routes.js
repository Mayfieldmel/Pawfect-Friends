const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Pet, Comment, Image} = require('../models');
const { withAuth, withAuthSign } = require('../utils/auth');

router.get('/:id', withAuthSign, (req, res) => {
    console.log("session data", req.session);
    console.log("hello", req.session.id);
    console.log('======================');
    // get all posts for dashboard
    Post.findAll({
      where: {
        pet_id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_text',
        'created_at',
      ],
      include: [
          {
              model: Pet,
              attributes: ['pet_name', 'email', 'password']
          },
          {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'pet_id', 'created_at'],
              include: {
              model: Pet,
              attributes: ['pet_name']
              }
          }
      ],
      order: [
          ['created_at', 'DESC']
      ]
    })
      .then(dbPostData => {
          // serialize data
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/add-post', withAuthSign, (req, res) => {
    res.render('add-post', {
      loggedIn: req.session.loggedIn
    })
  });

  module.exports = router;