'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Languages', [
      {language: 'English',
      "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"},
      {language: 'Español',
      "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"},
      {language: 'Portugues',
      "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"},
      {language: 'Frances',
      "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"},
      {language: 'Aleman',
      "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"}
   
   ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Languages', null, {});
     
  }
};
