'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('languages_users', [{
        user_id: 1,
        language_id: 2,
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('languages_users', null, {});
  }
};
