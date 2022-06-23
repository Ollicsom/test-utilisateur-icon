'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    static associate(models) {
    }
  }
  Step.init({
    ordre: DataTypes.NUMBER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Step',
    timestamps: false
  });
  return Step;
};