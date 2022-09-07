// import all models
const Post = require('./Post');
const Pet = require('./Pet');
// const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
Pet.hasMany(Post, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Pet, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

// Pet.belongsToMany(Pet, {
//   through: Friends,
//   as: 'follow',
//   foreignKey: 'friend_id',
//   onDelete: 'SET NULL'
// });

// Pet.belongsToMany(Pet, {
//     through: Friends,
//     as: 'follow',
//     foreignKey: 'pet_id',
//     onDelete: 'SET NULL'
// });

Pet.hasMany(Comment, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Pet, {
  foreignKey: 'pet_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'SET NULL'
})

module.exports = { Pet, Post, Comment };
