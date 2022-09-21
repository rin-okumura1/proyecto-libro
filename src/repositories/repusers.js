function getById(id){
    return usersList.find(i=>i.name==id)
    }
    const usersList=[ {
        "dni":123456,
        "name":"caro",
        "surname":"pacheco",
        "email_address" : "lalala@correo.com",
        "password":123554,
        "qualification":5,
        "status2":"active"
      },{
          
        "dni":123456,
        "name": "david",
        "surname":"pacheco",
        "email_address" : "lalala@correo.com",
        "password":123554,
        "qualification":5,
        "status2":"active"
      },{
          
        "dni":123456,
        "name": "ago",
        "surname":"pacheco",
        "email_address" : "lalala@correo.com",
        "password":123554,
        "qualification":5,
        "status2":"active"
      },
      {
          
        "dni":123456,
        "name": "nelson",
        "surname":"pacheco",
        "email_address" : "lalala@correo.com",
        "password":123554,
        "qualification":5,
        "status2":"active"
      }]
    
    module.exports={
        getById
    }