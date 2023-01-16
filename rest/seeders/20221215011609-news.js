'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('News', 
      [
        {id:"1",title:"Eddie Murphy to Receive Cecil B. DeMille Award at the Golden Globes",text:"Eddie Murphy will receive the Cecil B. DeMille Award at the 80th Annual Golden Globe Awards, Variety has confirmed.",author:"Michael Schneider"},
        {id:"2",title:"‘The Santa Clauses’ Renewed for Season 2 at Disney+",text:"The series stars Tim Allen and Elizabeth Mitchell reprising their roles as Santa aka Scott Calvin and Mrs. Claus aka Carol, respectively, from the “The Santa Clause” movies.",author:"Selome Hailu"},
        {id:"3",title:"The Santa Clauses Renewed at Disney+",text:"Disney+ is feeling festive these days, it seems: The streamer has renewed Tim Allen’s The Santa Clauses for a second season",author:"Dave Nemetz"},
        {id:"4",title:"‘Will Trent’: Karin Slaughter’s Investigator Comes to Life in Trailer for ABC’s New Series",text:"Will Trent, the series based on Karin Slaughter’s New York Times bestselling books of the same name, is coming to ABC in the new year. ",author:"TV Insider"},
        {id:"5",title:"Reese Witherspoon Cheerleading Comedy ‘All Stars’ Gets Two-Season Order at Amazon",text:"Following a bidding war, Amazon has put in a two-season straight to series order for the half-hour comedy “All Stars” from Reese Witherspoon’s Hello Sunshine.",author:"BreAnna Bell"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('News', null, {});
  }
};
