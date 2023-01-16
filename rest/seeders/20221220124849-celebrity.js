'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Celebrities', 
      [
        {id:"1",name:"Robert De Niro",professionId:"2",education:"Stella Adler Conservatory", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"2",name:"Paul Schrader",professionId:"4",education:"Stella Adler Conservatory", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"3",name:"Martin Scorsese",professionId:"1",education:"Stella Adler Conservatory", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"4",name:"Meryl Streep",professionId:"2",education:"Stella Adler Conservatory", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"5",name:"Elizabeth Taylor",professionId:"2",education:"Stella Adler Conservatory", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"}

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Celebrities', null, {});
  }
};
