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
<<<<<<< HEAD

      // Un User tiene muchos Books
=======
      // Un User publica muchos Books para vender/intercambiar
>>>>>>> origin/prefereces-test
      User.hasMany(models.book);
      //user tiene muchos favoritos (autores)
      User.belongsToMany(models.author,  {
        through: "authors_users",
        as: "authors",
        foreignKey: "user_id",
      } );
      //user tiene muchos favoritos (categorias)
      User.belongsToMany(models.category,  {
        through: "categories_users",
        as: "categories",
        foreignKey: "user_id",
      } );
      //user tiene muchos favoritos (lenguajes)
      User.belongsToMany(models.language, {
        through: "languages_users",
        as: "languages",
        foreignKey: "user_id",
      });
      // un user tieene penalidades
      User.hasOne(models.Penalty);
      //  Un User puede tener muchos rentals
      User.hasMany(models.Rental);
<<<<<<< HEAD
      
=======
>>>>>>> origin/prefereces-test
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
<<<<<<< HEAD
    } ,
    surname: {
=======
    },
     surname: {
>>>>>>> origin/prefereces-test
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