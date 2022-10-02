'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
         'authorId': 1,
         'editionYear': 2018,
         'title': 'Personas Decentes',
         'categoryId': 1,
         'languageId': 1,
         'synopsis':
         'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et',
         'available': 'DISPONIBLE',
         'userId': 1,
         'createdAt': "2022-01-01 22:58:01",
         'updatedAt': "2022-01-01 22:58:01"
     },
     {
      'authorId': 2,
      'editionYear': 2017,
      'title': 'Personas Malas',
      'categoryId': 2,
      'languageId': 1,
      'synopsis':
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et',
      'available': 'DISPONIBLE',
      'userId': 1,
      'createdAt': "2022-01-01 22:58:01",
      'updatedAt': "2022-01-01 22:58:01"
    },
    {
      'authorId': 1,
      'editionYear': 2019,
      'title': 'Personas Buenas',
      'categoryId': 1,
      'languageId': 1,
      'synopsis':
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et',
      'available': 'DISPONIBLE',
      'userId': 1,
      'createdAt': "2022-01-01 22:58:01",
      'updatedAt': "2022-01-01 22:58:01"
  },
  ], {});
   
  },

  async down (queryInterface, Sequelize) {
    /* *
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete('Books', null, {});
    
  }
};
