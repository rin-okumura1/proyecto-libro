'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Una Category tiene muchos Books
      Category.hasMany(models.book);
       //una categoria tiene varios usuarios que lo prefieren
       Category.belongsToMany(models.Users);
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'category',
    tableName: 'Categories'
  });
  return Category;
};