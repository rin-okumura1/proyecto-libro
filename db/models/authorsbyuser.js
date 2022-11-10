'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthorsByUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthorsByUser.init({

    userId:{
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
    }},

    authorId:{
      type: DataTypes.INTEGER,
      references: {
        model: author,
        key: 'id'
    }
   }

  }, 
  
  {
    sequelize,
    modelName: 'authorsbyuser',
    tableName: 'AuthorsByUsers',
  });
  return AuthorsByUser;
};