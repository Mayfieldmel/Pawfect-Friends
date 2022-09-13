const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Pet, Comment, Image } = require("../models");
const { withAuth, withAuthSign } = require("../utils/auth");
const sortArray = require('sort-array');

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

 
      // PUT /profile/img
router.put("/img", (req, res) => {
    // edit pet info
    Pet.update(req.body, {
      where: {
        id: req.session.pet_id,
      },
    })
      .then((dbPetData) => {
        console.log(dbPetData)
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
  

//   ORIGINAL WORKING GET POSTS ROUTE
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

// SUCCESS GETTING ONE ARRAY W/ POSTS & IMAGES
//   GET /profile/
router.get('/', withAuthSign, async (req, res) => {
    console.log("session data", req.session);
    console.log('======================');
    // get all posts & images for dashboard

    try {

        const petData = await Pet.findAll({
            where: {
              id: req.session.pet_id
            },
            raw: true
          })

        const postData = await Post.findAll({
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
            ],
            raw: true
        });

        const imgData = await Image.findAll({
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
            ],
            raw: true
        });

        console.log(postData);
        console.log(imgData);

        const combinedArr = [...postData, ...imgData];

        console.log(combinedArr);

        const dataArr = sortArray(combinedArr, {
            by: 'created_at',
            order: 'desc'
          });
    
        // return res.render('profile', { posts, loggedIn: true });


          console.log(dataArr);

        res.render('profile', { 
            pets: petData[0], 
            dataArr: dataArr, 
            loggedIn: true 
        });


    } catch (err) {
        console.log(err);
        res.sendStatus(500).json(err);
    };

});



// FAILED PROMISE.ALL ATTEMPT
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
