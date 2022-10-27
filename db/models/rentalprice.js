'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RentalPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un price de RentalPrice pertenece a un registro de un Book
      RentalPrice.belongsTo(models.book);
    }
  }
  RentalPrice.init({
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'rentalPrice',
    tableName: 'RentalPrices'
  });
  return RentalPrice;
};