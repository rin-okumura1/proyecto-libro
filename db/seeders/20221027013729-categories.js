'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories', [
        
        {name:'Poesia'},

        {name:'Historico'},

        {name:'Romance'},

        {name:'Ficcion'},

        {name:'Teatro'},

        {name:'Filosofia'},

        {name:'Fantasia'},

        {name:'Comedia'},

        {name:'Autoayuda'},

      
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Categories', null, {});
  }
};
