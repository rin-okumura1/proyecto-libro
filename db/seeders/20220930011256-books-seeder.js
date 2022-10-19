"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Books",
      [
        {
          authorId: 1,
          editionYear: 2018,
          title: "Crimen y castigo",
          categoryId: 1,
          languageId: 1,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 13,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 2,
          editionYear: 2017,
          title: "Cuentos infantiles",
          categoryId: 2,
          languageId: 2,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 13,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 1,
          editionYear: 2019,
          title: "El idiota",
          categoryId: 3,
          languageId: 3,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 18,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 3,
          editionYear: 2019,
          title: "Divina comedia",
          categoryId: 4,
          languageId: 1,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 14,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 4,
          editionYear: 2019,
          title: "Orgullo y prejuicio",
          categoryId: 4,
          languageId: 2,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 15,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 6,
          editionYear: 2019,
          title: "Cumbres Borrascosas",
          categoryId: 6,
          languageId: 5,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 16,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 5,
          editionYear: 2019,
          title: "Pippi Calzaslargas",
          categoryId: 7,
          languageId: 3,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 17,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
        {
          authorId: 7,
          editionYear: 2019,
          title: "La señora Dalloway",
          categoryId: 6,
          languageId: 2,
          synopsis:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
          availabilityId: 1,
          userId: 14,
          createdAt: "2022-01-01 22:58:01",
          updatedAt: "2022-01-01 22:58:01",
        },
      ], {});
  },

  async down(queryInterface, Sequelize) {
    /* *
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete("Books", null, {});
  },
};
