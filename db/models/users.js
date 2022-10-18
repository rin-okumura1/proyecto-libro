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
      User.belongsTo(models.Status)
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
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Ingrese una cuenta de correo electrónico válida'
        }
      }
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: {
          args: [8, 10],
          msg: 'Ingrese una contraseña válida, entre 8 y 10 caracteres'
        }
      }
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