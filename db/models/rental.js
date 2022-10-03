'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rental.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateFrom: {
      allowNull : false,
      type: Sequelize.DATE
    },
    dateToExpect: {
      allowNull : false,
      type: Sequelize.DATE
    },
    dateToReal: {
      allowNull : false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'Rental',
    tableName: 'Rentals'
  });
  return Rental;
};