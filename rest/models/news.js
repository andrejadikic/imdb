'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // define association here
    }
  }
  News.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'News',
  });
  return News;
};