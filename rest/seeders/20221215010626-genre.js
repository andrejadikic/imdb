'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', 
      [
        {id:"1",name:"comedy"},
        {id:"2",name:"romance"},
        {id:"3",name:"horror"},
        {id:"4",name:"thriler"},
        {id:"5",name:"action"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
