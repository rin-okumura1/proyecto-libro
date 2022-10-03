"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Languages",
      [
        {
          language: 'Español',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Inglés',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Alemán',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Chino mandarín',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Francés',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Portugués',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Japonés',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Turco',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          language: 'Italiano',
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
