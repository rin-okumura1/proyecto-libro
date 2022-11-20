const {
    assert
} = require('chai')
const request = require('supertest')
const app = require('../app')
const {
    
    Penalty,
    book,
    Users,
} = require("../db/models")

var user =  require ('../src/repositories/users')
var date = require ('../src/repositories/date')
var bookRepo = require ('../src/repositories/books')
var rentalRepo = require ('../src/repositories/Rental')






async function createUser(data) {
    const {
        name,
        surname,
        email,
        password
    } = data;
    const newdUser = await Users.create({
        "name": name,
        "surname": surname,
        "email": email,
        "password": password,
    });

    return newdUser
}
async function createPenalty(data) {
    const {
        userId,
        cantPenalty,
        dateTo
    } = data;
    const newdPenalty = await Penalty.create({
        "userId": userId,
        "cantPenalty":cantPenalty,
        "dateTo":dateTo
    });

    return newdPenalty
}


async function deleteUser(i) {
    return await Users.destroy({
        where: {
            id: i
        }
    })
   
}


async function deleteBook(i) {
    return await book.destroy({
        where: {
            "id": i
        }
    })
}

async function deletePenalty(i) {
    return await Penalty.destroy({
        where: {
            "id": i
        }
    })
}




describe('Rental', function() {
    let userDescribe, userDescribeEnable, bookDescribe,bookDescribePrice, bookNoAvailability, userDescribePenalty, rentalDescribeOk, bookDescribeOk,userDescribeOk, penaltyDescribe
    
    const NOTENABLE = 1

    beforeEach(async function () {

        dateNow = await date.getDateNow()



        let dataUser = {
            "name": "Maria",
            "surname": "Perez",
            "email": "mariaPerez@correo.com",
            "password": "123456"
        }
        userDescribe = await createUser(dataUser)

        let dataUserOk = {
            "name": "MariaOk",
            "surname": "PerezOk",
            "email": "mariaPerez@correo.com",
            "password": "123456"
        }
        userDescribeOk = await createUser(dataUserOk)

        let dataUserPenalty = {
            "name": "Penalty",
            "surname": "Penalty",
            "email": "penalty@correo.com",
            "password": "123456"
        }
        userDescribePenalty = await createUser(dataUserPenalty)
        
        let penaltyData = {
            "userId": userDescribePenalty.id,
            "cantPenalty":5,
            "dateTo": "2022-11-30"
        } 
        penaltyDescribe = await createPenalty(penaltyData)
        
        
        let dataUserEnable = {
            "name": "Usuario",
            "surname": "No habilitado",
            "email": "usuarioNoHabilitado@correo.com",
            "password": "123456"
        }
        userDescribeEnable = await createUser(dataUserEnable)
        await user.changeStatus(userDescribeEnable.id,NOTENABLE)
        
        bookDescribePrice=  await bookRepo.createBook(1,2018,"TestPrice",1,1,"Lorem ipsum dolor sit amet ..",userDescribe.id,1000)
        bookDescribeOk=  await bookRepo.createBook(1,2018,"TestOk",1,1,"Lorem ipsum dolor sit amet ..",userDescribe.id,1000)
        bookDescribe = await bookRepo.createBook(1,2018,"TestSinPrecio",1,1,"Lorem ipsum dolor sit amet ..",userDescribe.id)
        bookNoAvailability = await bookRepo.createBook(1,2018,"TestNoDisponible",1,1,"Lorem ipsum dolor sit amet ..",userDescribe.id,1000)
        await bookRepo.changeAvailability(bookNoAvailability.id, 2)

        rentalDescribeOk = await rentalRepo.saveRental(userDescribeOk.id, bookDescribeOk.id, dateNow, "2022-11-30")
       
        
        
    })

    describe('Registrar una renta', function() {


        it('Requiere el usuario no exista', function(done) {
            
            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":485789,
                        "bookId":bookDescribePrice.id,
                        "dateFrom": "2022-11-15",
                        "dateToExpect":"2022-11-16"
                        
                      }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_REQUEST')
                    if(err)  done(err);
                    return done();
                })
            }) 
                //---------------------------------------------------------
    
        it ('Requiere que el libro no exista', function(done) {
            
            
                    request(app)
                        .post('/rental')
                        .send(
                            {
                                "userId":userDescribe.id,
                                "bookId":21321,
                                "dateFrom": "2022-11-15",
                                "dateToExpect":"2022-11-16"
                                
                              }
                        )
                        .expect(400)
                        .end(function(err, res) {
                            assert.equal(res.body.message, 'BAD_REQUEST')
                            if(err)  done(err);
                            return done();
                    
                })
            })
   

        //-------------------------------------------------

        it (' Se requiere que el dateFrom sea menor del dia actual', function(done) {

            
            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribe.id,
                        "bookId":bookDescribePrice.id,
                        "dateFrom": "2022-11-15",
                        "dateToExpect":"2022-11-16"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'INVALID_DATE_FROM')
                    if(err)  done(err);
                    return done();
            
        })
    })
        //---------------------------------------------------

       it (' Se requiere que el dateExpect sea menor que el dia actual y el dateFrom', function(done) {
           
            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribe.id,
                        "bookId":bookDescribePrice.id,
                        "dateFrom": dateNow ,
                        "dateToExpect":"2022-11-15"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'INVALID_DATE_TO_EXPECT')
                    if(err)  done(err);
                    return done();
        })
    })

        //-------------------------------------------

        it (' Se requiere que el usuario no se encuentre habilitado para rentar', function(done) {
            
            
            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribeEnable.id,
                        "bookId":bookDescribe.id,
                        "dateFrom": dateNow,
                        "dateToExpect":"2022-11-30"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'USER_DON\'T_ENABLE')
                    if(err)  done(err);
                    return done();
        })
    })

        //--------------------------------------------------------------------------

        it (' Se requiere que el libro no se encuentre disponible para rentar', function(done) {
         
         
               request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribe.id,
                        "bookId":bookNoAvailability.id,
                        "dateFrom": dateNow,
                        "dateToExpect":"2022-11-30"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BOOK_DON\'T_AVAILABLE')
                    if(err)  done(err);
                    return done();
                    })
    })

        //----------------------------------------------------------------------------

       it (' Se requiere que el libro no se encuentre destinado para rental, es decir que tenga registro en la tabla de RentalPrice', function(done) {
          
          
            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribe.id,
                        "bookId":bookDescribe.id,
                        "dateFrom": dateNow,
                        "dateToExpect":"2022-11-30"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BOOK_IS_NOT_A_RENT')
                    if(err)  done(err);
                    return done();
        })
   })

        //-------------------------------------------------------------------------------------------------------------*

        it (' Se requiere que el usuario tenga penalidades con fecha vigente', function(done) {

            request(app)
                .post('/rental')
                .send(
                    {
                        "userId":userDescribePenalty.id,
                        "bookId":bookDescribePrice.id,
                        "dateFrom": dateNow,
                        "dateToExpect":"2022-11-30"
                        
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'PENALTY_VALID')
                    if(err)  done(err);
                    return done();
        })
    }) 

       it('Se requiere que codigo 200 por registro exitoso', function(done) {
  
        request(app)
            .post('/rental/')
            .send(
                 {
                
                     "userId":userDescribe.id,
                        "bookId":bookDescribePrice.id,
                        "dateFrom": dateNow,
                        "dateToExpect":"2022-11-30"   
                }
            )
            .expect(201,done)
        })

}) 

describe('Confirmar la devolucion de la renta', function() {

    it('Se requiere que el dateToReal no coincida con el dia actual', function(done) {

        request(app)
            .put('/rental/' + rentalDescribeOk.id)
            .send(
                {
                
                    "dateToReal":"2022-11-25"
                    
                  }
            )
            .expect(400)
            .end(function(err, res) {
                assert.equal(res.body.message, 'INVALID_DATE_TO_REAL')
                if(err)  done(err);
                return done();
            })
        }) 

    //-----------------------------------------------------------------------------
    
    it('Se requiere que el dateToReal coincida con el dia actual', function(done) {
  
        request(app)
            .put('/rental/' + rentalDescribeOk.id)
            .send(
                {
                
                    "dateToReal":dateNow
                    
                  }
            )
            .expect(201,done)
        }) 
  


}) 

  afterEach(async function () {
    
    await deleteUser(userDescribe.id)
    await deleteUser(userDescribeEnable.id)
    await deleteUser(userDescribePenalty.id)
    await deleteUser(userDescribeOk.id)
    await deleteBook(bookDescribe.id)
    await deleteBook(bookNoAvailability.id)
    await deleteBook(bookDescribePrice.id)
    await deleteBook(bookDescribeOk.id)
    await deletePenalty(penaltyDescribe.id)

   
            }) 
           
}); 




  