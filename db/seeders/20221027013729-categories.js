'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories', [{
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Categories', null, {});
  }
};
