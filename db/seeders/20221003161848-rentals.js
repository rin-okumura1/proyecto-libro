'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rentals', [
      {
          "userId":1,
          "bookId":2,
          "dateFrom": "2022-09-26 00:00:00",
          "dateToExpect": "2022-09-29 00:00:00",
          "dateToReal": "2022-09-29 00:00:00",
          "createdAt": "2022-01-01 21:00:00",
          "updatedAt": "2022-02-01 21:00:00"
      },
      {
          "userId":3,
          "bookId":4,
          "dateFrom": "2022-10-01 00:00:00",
          "dateToExpect": "2022-10-05 00:00:00",
          "dateToReal": "2022-10-06 00:00:00",
          "createdAt": "2022-02-01 21:00:00",
          "updatedAt": "2022-03-01 21:00:00"
    },
    {
          "userId":4,
          "bookId":5,
          "dateFrom": "2022-10-06 00:00:00",
          "dateToExpect": "2022-10-10 00:00:00",
          "dateToReal": "2022-10-10 00:00:00",
          "createdAt": "2022-03-01 21:00:00",
          "updatedAt": "2022-04-01 21:00:00"
  },
  {
          "userId":6,
          "bookId":7,
          "dateFrom": "2022-10-12 00:00:00",
          "dateToExpect": "2022-10-15 00:00:00",
          "dateToReal": "2022-10-18 00:00:00",
          "createdAt": "2022-04-01 21:00:00",
          "updatedAt": "2022-05-01 21:00:00"
  }
], {});

},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rentals', null, {});
  }
};
