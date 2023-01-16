'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({AwardWinner}) {
      this.hasMany(AwardWinner, {
        foreignKey: 'awardId',
        as: 'winners',
        onDelete: 'cascade',
        hooks:true
      });
    }
  }
  Award.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Award',
  });
  return Award;
};