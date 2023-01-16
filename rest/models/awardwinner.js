'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardWinner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Award, Celebrity}) {
      this.belongsTo(Award, {
        foreignKey: 'awardId',
        as: 'award'
      });
      this.belongsTo(Celebrity, {
        foreignKey: 'celebrityId',
        as: 'celebrity'
      });
      
    }
  }
  AwardWinner.init({
    year: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'AwardWinner',
  });
  return AwardWinner;
};