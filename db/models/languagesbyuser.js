'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LanguagesByUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LanguagesByUser.init({


    userId:{
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
    }
  },

    languageId:{
      type: DataTypes.INTEGER,
      references: {
        model: language,
        key: 'id'
    }
   }


  
  }, {
    sequelize,
    modelName: 'languagesbyuser',
    tableName: 'LanguagesByUsers'
  });
  return LanguagesByUser;
};