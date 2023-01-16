'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Genre,MovieCelebrity, Review}) {
      this.belongsTo(Genre, {
        foreignKey: 'genreId',
        as: 'genre'
      });

      this.hasMany(MovieCelebrity, {
        foreignKey: 'movieId',
        as: 'roles',
        onDelete: 'cascade',
        hooks:true
      });
      this.hasMany(Review, {
        foreignKey: 'movieId',
        as: 'reviews',
        onDelete: 'cascade',
        hooks:true
      });

    }
  }
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.DOUBLE,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Movie',
  });
  return Movie;
};