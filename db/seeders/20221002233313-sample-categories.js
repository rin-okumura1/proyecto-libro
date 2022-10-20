'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', 
    [
      {
        name: "Ciencia ficción",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novela de culto",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novela de no ficción",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novela histórica",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novela negra",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novelas",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
      {
        name: "Novela romántica",
        'createdAt': "2022-01-01 22:58:01",
        'updatedAt': "2022-01-01 22:58:01"
      },
    ], {});
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
