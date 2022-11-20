'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Authors', [
    
    {name: 'Gabriel Garcia Marquez',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Jorge Luis Borges',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Alfonsina Storni',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Agatha Christie',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Ernesto Sabato',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Milan Kundera',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Roberto Cosa',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'William Shakespeare',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Roberto Arlt',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Virginia Wolf',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Jane Austen',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"},
    {name: 'Emily Dickinson ',
    "createdAt": "2022-02-01 21:00:00",
    "updatedAt": "2022-03-01 21:00:00"}
  
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
