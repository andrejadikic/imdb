'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Awards', 
      [
        {id:"1",name:"best actor"},
        {id:"2",name:"best director"},
        {id:"3",name:"best production"},
        {id:"4",name:"best movie"},
        {id:"5",name:"best scenario"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Awards', null, {});
  }
};
