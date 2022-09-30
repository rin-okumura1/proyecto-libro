'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [ {
      "dni":123456,
      "name":"caro",
      "surname":"pacheco",
      "email" : "lalala@correo.com",
      "password":123554
      ,createdAt: "2022-01-01 22:58:01",
      updatedAt: "2022-01-01 22:58:01"
    },{
        
      "dni":123456,
      "name": "david",
      "surname":"pacheco",
      "email" : "lalala@correo.com",
      "password":123554
      ,createdAt: "2022-01-01 22:58:01",
      updatedAt: "2022-01-01 22:58:01"
    },{
        
      "dni":123456,
      "name": "ago",
      "surname":"pacheco",
      "email" : "lalala@correo.com",
      "password":123554,
      createdAt: "2022-01-01 22:58:01",
      updatedAt: "2022-01-01 22:58:01"
    },
    {
        
      "dni":123456,
      "name": "nelson",
      "surname":"pacheco",
      "email" : "lalala@correo.com",
      "password":123554,
      createdAt: "2022-01-01 22:58:01",
      updatedAt: "2022-01-01 22:58:01"
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};