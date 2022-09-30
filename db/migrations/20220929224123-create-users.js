'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dni: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Users');
  }
};

  /*migration{ 
npx sequelize-cli db:migrate         hacer
sequelize db:migration:undo     deshacer
  }
  seed{
    npx sequelize-cli seed:generate --name Users   generar
    npx sequelize-cli db:seed:all    correr

    {
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
    }
  }

*/ 