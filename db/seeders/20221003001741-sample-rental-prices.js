"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("RentalPrices",
      [
        {
          price: 1500,
          bookId: 1,
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          price: 4369.45,
          bookId: 3,
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          price: 5236.56,
          bookId: 5,
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
        {
          price: 15478.12,
          bookId: 7,
          'createdAt': "2022-01-01 22:58:01",
          'updatedAt': "2022-01-01 22:58:01"
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RentalPrices", null, {});
  },
};
