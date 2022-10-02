"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /* *
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkInsert("Authors",
      [
        {
          name: "Gustave Flaubert",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Gabriel García Márquez",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Nikolai Gogol",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Franz Kafka",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Elsa Morante",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Fernando Pessoa",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Virginia Woolf",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /* *
     * Add commands to revert seed here.
     *
     * Example: */
     await queryInterface.bulkDelete('Authors', null, {});
    
  },
};
