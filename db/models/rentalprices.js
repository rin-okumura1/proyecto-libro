'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalPrices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RentalPrices.init({
    price: DataTypes.DECIMAL,
    bookId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RentalPrices',
    tableName: 'RentalPrices'
  });
  return RentalPrices;
};