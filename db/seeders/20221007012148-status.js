"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Statuses", [
      {
        state: "Disabled",
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
      {
        state: "Enabled",
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Statuses", null, {});
    
  },
};
