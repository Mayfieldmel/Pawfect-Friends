const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Pet, Comment, Image } = require("../models");
const { withAuth, withAuthSign } = require("../utils/auth");

// GET profile/update
router.get("/update", withAuthSign, (req, res) => {
  res.render("update", {
    loggedIn: req.session.loggedIn,
  });
});

// GET profile/add-post
router.get("/add-post", withAuthSign, (req, res) => {
  res.render("add-post", {
    loggedIn: req.session.loggedIn,
  });
});

//  GET /profile
router.get("/", withAuthSign, (req, res) => {
    res.render("profile", {
      loggedIn: req.session.loggedIn,
    });
  });
// router.get('/', withAuthSign, (req, res) => {
//     console.log("session data", req.session);
//     console.log('======================');
//     // get all posts for dashboard
//     Post.findAll({
//       where: {
//         pet_id: req.session.pet_id
//       },
//       attributes: [
//         'id',
//         'post_text',
//         'created_at',
//       ],
//       include: [
//           {
//               model: Pet,
//               attributes: ['pet_name', 'email', 'password']
//           },
//           {
//               model: Comment,
//               attributes: ['id', 'comment_text', 'post_id', 'pet_id', 'created_at'],
//               include: {
//               model: Pet,
//               attributes: ['pet_name']
//               }
//           }
//       ],
//       order: [
//           ['created_at', 'DESC']
//       ]
//     })
//       .then(dbPostData => {
//           // serialize data
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('profile', { posts, loggedIn: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

//   GET /profile/display
router.get('/display', withAuthSign, (req, res) => {
    console.log("session data", req.session);
    console.log('======================');
    // get all posts & images for dashboard
    Post.findAll({
        where: {
            pet_id: req.session.pet_id
        },
        attributes: [
            'id',
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
    }).then(dbPostData => {
    Image.findAll({
        where: {
            pet_id: req.session.pet_id
        },
        attributes: ['image', 'created_at'],
        include: [
            {
                model: Pet,
                attributes: ['pet_name']
            }
            // ,
            // {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'pet_id', 'created_at'],
            //     include: {
            //     model: Pet,
            //     attributes: ['pet_name']
            //     }
            // }
        ],
        order: [
            ['created_at', 'DESC']
        ]
    })
    .then(dbImageData => {
        const dbAllData = [...dbPostData, ...dbImageData]
        console.log(dbAllData)
        return dbAllData;
    })
    .then(dbPostData => {
        // serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts)
      res.render('profile', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})
      
  });
// router.get('/', withAuthSign, (req, res) => {
//         console.log("session data", req.session);
//         console.log('======================');
//         // get all posts & images for dashboard
//         return Promise.all([
//         getPosts(req, res),
//         getImages(req, res)
//       ])
//           .then(dbPostData => {
//               // serialize data
//             const posts = dbPostData.map(post => post.get({ plain: true }));
//             console.log(posts)
//             res.render('profile', { posts, loggedIn: true });
//           })
//           .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//           });
//       });


function getPosts(req, res) {
    Post.findAll({
        where: {
            pet_id: req.session.pet_id
        },
        attributes: [
            'id',
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
    // .then(dbPostData => {
    //     // serialize data
    //     const posts = dbPostData.map(post => post.get({ plain: true }));
    //     res.render('profile', { posts, loggedIn: true });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
}
function getImages(req, res) {
    Image.findAll({
        where: {
            pet_id: req.session.pet_id
        },
        attributes: ['image', 'created_at'],
        include: [
            {
                model: Pet,
                attributes: ['pet_name']
            }
            // ,
            // {
            //     model: Comment,
            //     attributes: ['id', 'comment_text', 'post_id', 'pet_id', 'created_at'],
            //     include: {
            //     model: Pet,
            //     attributes: ['pet_name']
            //     }
            // }
        ],
        order: [
            ['created_at', 'DESC']
        ]
    })
    // .then(dbImageData => {
    //     // serialize data
    //     const images = dbImageData.map(image => image.get({ plain: true }));
    //     res.render('profile', { images, loggedIn: true });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
}
module.exports = router;
