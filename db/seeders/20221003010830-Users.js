"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Luisa",
        surname: "Pacheco",
        email: "lpacheco@correo.com",
        password: 12345678,
        score: 1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
      {
        name: "Analía",
        surname: "Schppe",
        email: "aschoppe@correo.com",
        password: 12345678,
        score: 1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
      {
        name: "Agostina",
        surname: "Luciano",
        email: "aluciano@correo.com",
        password: 12345678,
        score: 1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
      {
        name: "Carolina",
        surname: "Paz",
        email: "cpaz@correo.com",
        password: 12345678,
        score: 1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
      {
        name: "David",
        surname: "Nobati",
        email: "dnobati@correo.com",
        password: 12345678,
        score: 1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Users", null, {});
    };
  },
};
