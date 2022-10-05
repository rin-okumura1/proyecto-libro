'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availabilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Availabilities.init({
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Availabilities',
    tableName: 'Availabilities'
  });
  return Availabilities;
};