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
    authorId: DataTypes.INTEGER,
    editionYear: DataTypes.INTEGER,
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER,
    synopsis: DataTypes.STRING,
    available : DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'Books'
  });
  return Book;
};