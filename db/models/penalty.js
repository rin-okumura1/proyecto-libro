'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penalty.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantPenalty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull:false
  }
}, {
    sequelize,
    modelName: 'Penalty',
    tableName: 'Penalties'
  });
  return Penalty;
};