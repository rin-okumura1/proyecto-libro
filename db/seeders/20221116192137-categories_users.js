'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('categories_users', [{
        user_id: 1,
        category_id: 1,
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('categories_users', null, {});
     
  }
};
