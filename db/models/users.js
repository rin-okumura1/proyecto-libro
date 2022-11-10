'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un User pertenece a un único statusId de la entidad Status
      User.belongsTo(models.Status);

      // Un User publica muchos Books para vender/intercambiar
      User.hasMany(models.book);

       //user tiene muchos favoritos (autores)
       User.belongsToMany(models.author,  { through: 'AuthorsByUsers' });
       //user tiene muchos favoritos (categorias)
       User.belongsToMany(models.category, { through: 'CategoriesByUsers'});
       //user tiene muchos favoritos (lenguajes)
       User.belongsToMany(models.lenguages,  { through: 'LanguagesByUsers'});

    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName:'Users'
  });
  return User;
};