'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Book pertenece a un solo Author
      Book.belongsTo(models.author);

      // Un Book pertenece a una sola Category
      Book.belongsTo(models.category);

      // Un Book sólo pertenece a una Availability
      Book.belongsTo(models.availability);

      // Un Book sólo puede pertenecer a un único Language
      Book.belongsTo(models.language);

      // Un Book sólo puede tener un registro de price de RentalPrices
      Book.hasOne(models.rentalPrice);
    }
  }
  Book.init({
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    editionYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        customValidator(value) {
          if(value < 2 || value > 100 ) {
            throw new Error('La longitud del título del libro debe ser mínimo 2 caracteres y máximo 100 caracteres')
          }
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true
    },
    synopsis: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    availabilityId : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'book',
    tableName: 'Books'
  });
  return Book;
};