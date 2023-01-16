'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //id	userId	movieId	username	comment	rating	
    await queryInterface.bulkInsert('Reviews', 
      [
        {id:"1",userId:"1",movieId:"1",username:"Arthur",comment:"nesto",rating:"4.7"},
        {id:"2",userId:"3",movieId:"5",username:"Rose",comment:"nesto",rating:"5.7"},
        {id:"3",userId:"1",movieId:"4",username:"Writer",comment:"nesto",rating:"7.7"},
        {id:"4",userId:"1",movieId:"3",username:"Director",comment:"nesto",rating:"6.7"},
        {id:"5",userId:"2",movieId:"2",username:"Stella",comment:"nesto",rating:"9.7"}

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
