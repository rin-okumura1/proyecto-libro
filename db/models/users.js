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
      // Un user pertenece a un único statusId de la entidad Status
      User.belongsTo(models.Status);

      // Un User puede tener muchos Books relacionados consigo mismo
      User.hasMany(models.book);

      //  Un User puede tener muchos rentals
      User.hasMany(models.Rental);
      ;

      // Un user puede pertenecer a muchos Books relacionados consigo mismo
      User.hasMany(models.book)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    } ,
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
      allowNull: true,
      defaultValue: 0
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName:'Users'
  });
  return User;
};