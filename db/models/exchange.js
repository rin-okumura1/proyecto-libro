'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exchange.belongsTo(models.book, {foreignKey: "bookId1"});
      Exchange.belongsTo(models.book, {foreignKey:"bookId2"});
    }
  }
  Exchange.init({
    bookId1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId2: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull:false
  }
  }, {
    sequelize,
    modelName: 'Exchange',
    tableName: 'Exchanges'
  });
  return Exchange;
};