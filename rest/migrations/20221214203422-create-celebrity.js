'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Celebrities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      professionId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Professions',
          key: 'id'
        },
        onDelete: "CASCADE",
      },
      education: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Celebrities');
  }
};