'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Movie}) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(Movie, {
        foreignKey: 'movieId',
        as: 'movie'
      });
      
    }
  }
  Review.init({
    username: DataTypes.STRING,
    comment: DataTypes.STRING,
    rating: DataTypes.DOUBLE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Review',
  });
  return Review;
};