'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User,{foreignKey:"NickName",targetKey:"NickName"}),
      Post.hasMany(models.Comment,{foreignKey:"PostId"}),
      Post.belongsToMany(models.Tag,{
        through: "Post_Tags",
        as:"tags",
        foreignKey: "postId"
      } ),
      Post.hasMany(models.PostImages,{
        foreignKey: "postId",
        as:"images",
        onDelete:"CASCADE"
      })
    }
  }
  Post.init({
    NickName: {type: DataTypes.STRING, allowNull:false},
    contenido: {type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};