'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      genreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Genres',
          key: 'id'
        },
        onDelete: "CASCADE",
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DOUBLE
      },
      imageUrl: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};