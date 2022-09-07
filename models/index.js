// import all models
const Post = require('./Post');
const Pet = require('./Pet');
<<<<<<< HEAD
const Friend = require('./Friend');
=======
// const Vote = require('./Vote');
>>>>>>> d915f01961417d263e363d8183e3b9cbc4d56bdd
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

Pet.hasMany(Pet, {
    foreignKey: 'friend_id',
    onDelete: 'SET NULL'
})

Pet.hasMany(Pet, {
    foreignKey: 'friend_id',
    onDelete: 'SET NULL'
})

module.exports = { Pet, Post, Comment };
