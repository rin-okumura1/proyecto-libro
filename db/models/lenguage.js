'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lenguage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lenguage.init({
    lenguage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lenguage',
    tableName: 'lenguages'
  });
  return lenguage;
};