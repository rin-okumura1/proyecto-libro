'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.bulkInsert('authors_users', [{
      user_id: 1,
      author_id: 3,
      'createdAt': "2022-01-01 22:58:01",
      'updatedAt': "2022-01-01 22:58:01"
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('authors_users', null, {});
     
  }
};
