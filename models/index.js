//import models
const Post = require("./Post");
const User = require("./User");
const Comment = require("./Comment");

//comments belong to posts
Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

//comments belong to users
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

//users can create many comments
User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

//posts can have many comments

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

module.exports = {Post,User,Comment};