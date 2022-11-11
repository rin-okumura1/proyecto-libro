'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Penalties', [
      {
          "userId":1,
          "cantPenalty":1,
          "dateTo": "2022-09-25 00:00:00",
          "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"
      },
      {
          "userId":2,
          "cantPenalty":0,
          "dateTo": "2022-04-01 00:00:00",
          "createdAt": "2022-05-01 21:00:00",
          "updatedAt": "2022-06-01 21:00:00"
      }
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Penalties', null, {});
   
  }
};
