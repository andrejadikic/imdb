'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Celebrity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Profession, AwardWinner,MovieCelebrity}) {
      this.belongsTo(Profession, {
        foreignKey: 'professionId',
        as: 'profession',
      });

      this.hasMany(MovieCelebrity, {
        foreignKey: 'celebrityId',
        as: 'roles',
        onDelete: 'cascade',
        hooks:true 
      });

      this.hasMany(AwardWinner, {
        foreignKey: 'celebrityId',
        as: 'awards',
        onDelete: 'cascade',
        hooks:true 
      });
    }
  }
  Celebrity.init({
    name: DataTypes.STRING,
    education: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Celebrity',
  });
  return Celebrity;
};