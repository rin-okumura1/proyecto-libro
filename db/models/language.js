'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un Language puede tener muchos registros de Books
      Language.hasMany(models.book);

      //un lenguage tiene varios usuarios que lo prefieren
      Language.belongsToMany(models.Users, {
        through: "languages_users",
        as: "users",
        foreignKey: "language_id",
      });
    }
  }
  Language.init({
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'language',
    tableName: 'Languages'
  });
  return Language;
};