'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un status se relaciona o tiene muchos Users
      Status.hasMany(models.Users)
    }
  }
  Status.init({
    state: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Status',
    tableName:'Statuses'
  });
  return Status;
};