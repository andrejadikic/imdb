'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AwardWinners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      awardId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Awards',
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
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AwardWinners');
  }
};