'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    editionYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: DataTypes.STRING(100),
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    synopsis: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    availabilityId : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books'
  });
  return Book;
};