'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCelebrity extends Model {
    static associate({Celebrity, Movie}) {
      this.belongsTo(Celebrity, {
        foreignKey: 'celebrityId',
        as: 'celebrity' 
      });
      this.belongsTo(Movie, {
        foreignKey: 'movieId',
        as: 'movie'
      });
      
    }
  }
  MovieCelebrity.init({
    role: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'MovieCelebrity',
  });
  return MovieCelebrity;
};