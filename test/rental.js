const {
    assert
} = require('chai')
const request = require('supertest')
const app = require('../app')
const {
    Penalty,
    book,
    Users,
    Rental
} = require("../db/models")

var user =  require ('../src/repositories/users')
var date = require ('../src/repositories/date')
var bookRepo = require ('../src/repositories/books')





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




describe('Rental', function() {
    let userDescribe
    let userDescribeEnable
    let bookDescribe
    let bookDescribePrice
    let bookNoAvailability 
    let userDescribePenalty
    
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
        await createPenalty(penaltyData)
        
    
       

        let dataUserEnable = {
            "name": "Usuario",
            "surname": "No habilitado",
            "email": "usuarioNoHabilitado@correo.com",
            "password": "123456"
        }
        userDescribeEnable = await createUser(dataUserEnable)
        await user.changeStatus(userDescribeEnable.id,NOTENABLE)
        

        
        let dataBookPrice = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "TestPrice",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 1,
            "userId": userDescribe.id,
            "price":1000

        }
        bookDescribePrice=  await bookRepo.createBook(dataBookPrice)

        

        let dataBook = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "TestSinPrecio",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 1,
            "userId": userDescribe.id,
            

        }
         bookDescribe = await bookRepo.createBook(dataBook)

        


     

        let dataBookNoAvailability = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "TestNoDisponible",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 2,
            "userId": userDescribe.id,
            "price":1000

        }

        bookNoAvailability = await bookRepo.createBook(dataBookNoAvailability)
        await bookRepo.changeAvailability(bookNoAvailability.id, 2)
        
        
    
        
        

       
        
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

            console.log("data from menor al dia actual");
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
         
         console.log(bookNoAvailability);
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

        

}) // finaliza primer describe

describe('Confirmar la devolucion de la renta', function() {

    it('Se requiere que el dateToReal no coincida con el dia actual', function(done) {

        // request(app)
        //     .put('/rental/43')
        //     .send(
        //         {
                
        //             "dateToReal":"2022-11-15"
                    
        //           }
        //     )
        //     .expect(400)
        //     .end(function(err, res) {
        //         assert.equal(res.body.message, 'INVALID_DATE_TO_REAL')
        //         if(err)  done(err);
        //         return done();
        //     })
        }) 

    //-----------------------------------------------------------------------------
    
    skip.it('Se requiere que el dateToReal coincida con el dia actual', function(done) {
  
        // request(app)
        //     .put('/rental/43')
        //     .send(
        //         {
                
        //             "dateToReal":"2022-11-15"
                    
        //           }
        //     )
        //     .expect(400)
        //     .end(function(err, res) {
        //         assert.equal(res.body.message, 'INVALID_DATE_TO_REAL')
        //         if(err)  done(err);
        //         return done();
        //     })
        // }) 
  


}) 
           
}); // finaliza segundo describe

afterEach(async function () {
    await deleteUser(userDescribe.id)
    //await deleteUser(userDescribeTwo.id)
    await deleteUser(userDescribeEnable.id)
    await deleteBook(bookDescribe.id)
    //await deleteBook(bookDescribeTwo.id)
    await deleteBook(bookNoAvailability .id)
   // await deleteExchange(bookDescribe.id)
            }) // finaliza afteeach


})  // finaliza describe ppal