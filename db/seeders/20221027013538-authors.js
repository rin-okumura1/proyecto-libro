'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Authors', [
    
    {name: 'Gabriel Garcia Marquez'},
    {name: 'Jorge Luis Borges'},
    {name: 'Alfonsina Storni'},
    {name: 'Agatha Christie'},
    {name: 'Ernesto Sabato'},
    {name: 'Milan Kundera'},
    {name: 'Roberto Cosa'},
    {name: 'William Shakespeare'},
    {name: 'Roberto Arlt'},
    {name: 'Virginia Wolf'},
    {name: 'Jane Austen'},
    {name: 'Emily Dickinson '}
  
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
