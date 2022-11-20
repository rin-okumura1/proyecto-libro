'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Un Author tiene muchos Books
      Author.hasMany(models.book);
     //un author tiene varios usuarios que lo prefieren
      Author.belongsToMany(models.Users,  {
        through: "authors_users",
        as: "users",
        foreignKey: "author_id",
      } ); 
    }
  }
  Author.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'author',
    tableName: 'Authors'
  });
  return Author;
};