'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Exchanges', [
      {
          "bookId1":1,
          "bookId2":2,
          "date": "2022-09-26 00:00:00",
          "createdAt": "2022-04-01 21:00:00",
          "updatedAt": "2022-05-01 21:00:00"
      },
      {
        "bookId1":3,
        "bookId2":4,
        "date": "2022-09-27 00:00:00",
        "createdAt": "2022-05-01 21:00:00",
        "updatedAt": "2022-06-01 21:00:00"
    },
    {
      "bookId1":5,
      "bookId2":6,
      "date": "2022-09-28 00:00:00",
      "createdAt": "2022-06-01 21:00:00",
      "updatedAt": "2022-07-01 21:00:00"
  },
  {
    "bookId1":7,
    "bookId2":8,
    "date": "2022-09-29 00:00:00",
    "createdAt": "2022-07-01 21:00:00",
    "updatedAt": "2022-08-01 21:00:00"
  }
], {});

},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Exchanges', null, {});
  }
};
