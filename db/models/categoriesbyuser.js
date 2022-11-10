'use strict';
const {
  Model
} = require('sequelize');
const category = require('./category');
module.exports = (sequelize, DataTypes) => {
  class CategoriesByUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoriesByUser.init({


    userId:{
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
    }
  },

    categoriesId:{
      type: DataTypes.INTEGER,
      references: {
        model: category,
        key: 'id'
    }
   }



    
  }, {
    sequelize,
    modelName: 'categoriesbyuser',
    tableName: 'CategoriesByUsers'
  });
  return CategoriesByUser;
};