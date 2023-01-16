'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Movie}) {
      this.hasMany(Movie, {
        foreignKey: 'genreId',
        as: 'movies',
        onDelete: 'cascade',
        hooks:true
      });
    }
  }
  Genre.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};