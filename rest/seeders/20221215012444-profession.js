'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Professions', 
      [
        {id:"1",name:"director"},
        {id:"2",name:"actor"},
        {id:"3",name:"scenarist"},
        {id:"4",name:"writers"},
        {id:"5",name:"producer"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Professions', null, {});
  }
};
