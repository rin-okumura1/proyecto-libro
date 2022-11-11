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
       // Un Rental pertenece a un Book
   Rental.belongsTo(models.book);

   // Un Rental pertenece a un User
   Rental.belongsTo(models.Users);
   
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
      type: DataTypes.DATE
    },
    dateToExpect: {
      allowNull : false,
      type: DataTypes.DATE
    },
    dateToReal: {
      allowNull : false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Rental',
    tableName: 'Rentals'
  });
  return Rental;
};