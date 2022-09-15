// import all models
const Post = require('./Post');
const Pet = require('./Pet');
const Comment = require('./Comment');
// const Friend = require('./Friend');
const Image = require('./Image');

// create associations
Pet.hasMany(Post, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Pet, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Pet.hasMany(Comment, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

// Pet.hasMany(Pet, {
//   foreignKey: friend_id,
//   onDelete: 'SET NULL'
// })
// Pet.hasMany(Pet, {
//   foreignKey: friend_id,
//   onDelete: 'SET NULL'
// })

Comment.belongsTo(Pet, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
})

// Pet.belongsToMany(Pet, {
//     through: Friend,
//     as: 'friends',
//     foreignKey: 'friend_id',
//     onDelete: 'SET NULL'
// })

// Pet.belongsToMany(Friend, {
//   through: 'friend',
//   as: 'follows',
//   foreignKey: 'pet_id',
//   onDelete: 'SET NULL'
// })


// Friend.belongsToMany(Pet, {
//     through: 'friend',
//     as: 'friends',
//     foreignKey: 'friend_id',
//     onDelete: 'SET NULL'
// })


Image.belongsTo(Pet, {
    foreignKey: 'pet_id',
    onDelete: 'SET NULL'
})

Pet.hasMany(Image, {
    foreignKey: 'pet_id',
    onDelete: 'SET NULL'
})

Comment.belongsTo(Image, {
  foreignKey: 'image_id',
  onDelete: 'SET NULL'
});

Image.hasMany(Comment, {
  foreignKey: 'image_id',
  onDelete: 'SET NULL'
})

module.exports = { Pet, Post, Comment, Image};
