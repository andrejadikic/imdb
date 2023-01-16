'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AwardWinners', 
      [
        {id:"1",awardId:"1",celebrityId:"1",year:"2020"},
        {id:"2",awardId:"3",celebrityId:"5",year:"2023"},
        {id:"3",awardId:"1",celebrityId:"4",year:"2001"},
        {id:"4",awardId:"1",celebrityId:"3",year:"2008"},
        {id:"5",awardId:"2",celebrityId:"2",year:"1998"}

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AwardWinners', null, {});
  }
};
