'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class languages_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  languages_users.init({
    user_id: DataTypes.STRING,
    language_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'languages_users',
  });
  return languages_users;
};