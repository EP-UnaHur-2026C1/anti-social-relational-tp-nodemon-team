'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'NickName' })
      Comment.belongsTo(models.Post, { foreignKey: 'PostId' })
    }
  }
  Comment.init({
    Estado: {type: DataTypes.BOOLEAN, allowNull:false},
    Contenido: {type: DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
