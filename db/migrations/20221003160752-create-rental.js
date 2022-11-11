'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        allowNull : false,
        type: Sequelize.INTEGER
      },
      bookId: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      dateFrom: {
        allowNull : false,
        type: Sequelize.DATE
      },
      dateToExpect: {
        allowNull : false,
        type: Sequelize.DATE
      },
      dateToReal: {
        allowNull : false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rentals');
  }
};