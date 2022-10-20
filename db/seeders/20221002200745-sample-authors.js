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
          name: "Fiódor Dostoievski",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Hans Christian Andersen",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Dante Alighieri",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Jane Austen",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Astrid Lindgren",
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          name: "Emily Brontë",
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
