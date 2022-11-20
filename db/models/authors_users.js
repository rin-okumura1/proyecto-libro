'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authors_users.init({
    user_id: DataTypes.STRING,
    author_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'authors_users',
  });
  return authors_users;
};