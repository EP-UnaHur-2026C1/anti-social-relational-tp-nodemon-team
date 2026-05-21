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
      Comment.belongsTo(models.User, { foreignKey: 'NickName', targetKey:"NickName" })
      Comment.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Comment.init({
    NickName: {type: DataTypes.STRING,allowNull:false},
    postId: {type: DataTypes.INTEGER,allowNull:false},
    contenido: {type: DataTypes.STRING, allowNull:false},
    date:{type: DataTypes.DATE, allowNull:false, defaultValue:DataTypes.NOW},
    estaVisible: {type: DataTypes.VIRTUAL, 
      get() {
        const limiteDeMeses = process.env.LIMITE_MESES_COMMENT
        const mesLimite = new Date()
        mesLimite.setMonth(mesLimite.getMonth() - limiteDeMeses)
        const commentDate = this.getDataValue("date")
        return commentDate>=mesLimite
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps:false
  });
  return Comment;
};
