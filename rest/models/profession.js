'use strict';
const {
  Model
} = require('sequelize');
const celebrity = require('./celebrity');
module.exports = (sequelize, DataTypes) => {
  class Profession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Celebrity}) {
      this.hasMany(Celebrity, {
        foreignKey: 'professionId',
        as: 'celebrities',
        onDelete: 'cascade',
        hooks:true
      });
    }
  }
  Profession.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Profession',
  });
  return Profession;
};