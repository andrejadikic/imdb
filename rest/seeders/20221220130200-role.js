'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MovieCelebrities', 
      [
        {id:"1",movieId:"1",celebrityId:"1",role:"Arthur"},
        {id:"2",movieId:"3",celebrityId:"5",role:"Rose"},
        {id:"3",movieId:"1",celebrityId:"4",role:"Writer"},
        {id:"4",movieId:"1",celebrityId:"3",role:"Director"},
        {id:"5",movieId:"2",celebrityId:"2",role:"Stella"}

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MovieCelebrities', null, {});
  }
};
