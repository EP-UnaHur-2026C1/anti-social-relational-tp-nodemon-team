'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post,{foreignKey:"NickName"}),
      User.hasMany(models.Comment,{foreignKey:"NickName"})
    }
  }
  User.init({
    NickName: {type: DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};