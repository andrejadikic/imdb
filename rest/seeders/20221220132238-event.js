'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', 
      [
        {id:"1",name:"Festival",location:"Kan",year:"2023"},
        {id:"2",name:"Event",location:"Los Angelles",year:"2022"},
        {id:"3",name:"Cinema",location:"Mexico",year:"2020"},
        {id:"4",name:"Night party",location:"Belgrade",year:"2023"},
        {id:"5",name:"Party",location:"New York",year:"2019"},
      ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
