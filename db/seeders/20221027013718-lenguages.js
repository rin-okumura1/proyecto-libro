'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Languages', [
      {language: 'English'},
      {language: 'Español'},
      {language: 'Portugues'},
      {language: 'Frances'},
      {language: 'Aleman'}
   
   ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Languages', null, {});
     
  }
};
