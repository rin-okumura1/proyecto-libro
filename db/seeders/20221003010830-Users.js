'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [ {
        "name":"caro",
        "surname":"pacheco",
        "email" : "lalala@correo.com",
        "password":123554,
        "score":1,
        "statusId":1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01"
      },
      { 
        "name": "david",
        "surname":"pacheco",
        "email" : "lalala@correo.com",
        "password":123554,
        "score":1,
        "statusId":1,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01"
      },{
        "name": "ago",
        "surname":"pacheco",
        "email" : "lalala@correo.com",
        "password":123554,
        "score":1,
        "statusId":2,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01"
      },
      {
        "name":"nelson",
        "surname":"pacheco",
        "email" : "lalala@correo.com",
        "password":123554,
        "score":1,
        "statusId":2,
        createdAt: "2022-01-01 22:58:01",
        updatedAt: "2022-01-01 22:58:01"
      }]);
    
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
}
};
