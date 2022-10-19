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

      // Un User tiene muchos Books
      User.hasMany(models.book);

      // un user tieene penalidades
      User.hasOne(models.Penalty);
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
        is: {
          args: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/gm,
          msg: 'Ingrese una contraseña válida, entre 8 y 12 caracteres, al menos 1 dígito, al menos una letra en mayúscula, al menos una letra en minúscula y al menos un carácter especial'
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