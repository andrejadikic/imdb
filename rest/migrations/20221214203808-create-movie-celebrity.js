'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovieCelebrities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies',
          key: 'id'
        },
        onDelete: "CASCADE",
      },
      celebrityId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Celebrities',
          key: 'id'
        },
        onDelete: "CASCADE",
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovieCelebrities');
  }
};