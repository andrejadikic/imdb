'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movies', 
      [
        {id:"1",title:"Taxi Driver",genreId:"2",description:"Stella Adler Conservatory", rating:"8.9", imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"2",title:"The Devil Wears Prada",genreId:"4",description:"Stella Adler Conservatory", rating:"7.8",imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"3",title:"Sophie's Choice",genreId:"1",description:"Stella Adler Conservatory", rating:"5.6",imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"4",title:"The Shining",genreId:"2",description:"Stella Adler Conservatory", rating:"3.8",imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"},
        {id:"5",title:"Inception",genreId:"3",description:"Stella Adler Conservatory", rating:"9.7",imageUrl:"https://image.tmdb.org/t/p/w500/cT8htcckIuyI1Lqwt1CvD02ynTh.jpg"}

      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
