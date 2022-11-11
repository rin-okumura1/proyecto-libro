'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories', [
        
        {name:'Poesia',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Historico',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Romance',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Ficcion',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Teatro',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Filosofia',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Fantasia',   "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Comedia',
        "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

        {name:'Autoayuda', 
          "createdAt": "2022-02-01 21:00:00",
        "updatedAt": "2022-03-01 21:00:00"},

      
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Categories', null, {});
  }
};
