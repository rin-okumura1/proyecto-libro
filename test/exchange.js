const {
    assert
} = require('chai')
const request = require('supertest')
const app = require('../app')
const {
    book,
    Users,
    Exchange
} = require("../db/models")

var usersRepo =  require ('../src/repositories/users')


async function createBook(data) {
    const {
        authorId,
        editionYear,
        title,
        categoryId,
        languageId,
        synopsis,
        availabilityId,
        userId
    } = data;
    const newdBook = await book.create({
        "authorId": authorId,
        "editionYear": editionYear,
        "title": title,
        "categoryId": categoryId,
        "languageId": languageId,
        "synopsis": synopsis,
        "availabilityId": availabilityId,
        "userId": userId
    });

    return newdBook
}

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

async function updateBook(bookId,userId) {
    return await book.update({
        userId
    },
    {
        where: {
            id: bookId
        }
    })
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


async function deleteExchange(bookId1) {
    return await Exchange.destroy({
        where: {
            "bookId1": bookId1
        }
    })
}


describe('Exchange', function () {

    let userDescribe
    let userDescribeTwo
    let userDescribeEnable
    let bookDescribe
    let bookDescribeTwo
    let bookNoAvailability 
    let exchangeDescribe
    const NOTENABLE = 1


    beforeEach(async function () {


        let dataUser = {
            "name": "Maria",
            "surname": "Perez",
            "email": "mariaPerez@correo.com",
            "password": "123456"
        }
        userDescribe = await createUser(dataUser)
        
    
        let dataUserTwo = {
            "name": "Juan",
            "surname": "Perez",
            "email": "juanperez@correo.com",
            "password": "123456"
        }
        userDescribeTwo = await createUser(dataUserTwo)

        let dataUserEnable = {
            "name": "Usuario",
            "surname": "No habilitado",
            "email": "usuarioNoHabilitado@correo.com",
            "password": "123456"
        }
        userDescribeEnable = await createUser(dataUserEnable)

        
        let dataBook = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "Test",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 1,
            "userId": userDescribe.id

        }

        bookDescribe = await createBook(dataBook)
     

        let dataBookTwo = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "Test Two",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 1,
            "userId": userDescribeTwo.id

        }
        bookDescribeTwo = await createBook(dataBookTwo)
        

        let dataBookNoAvailability = {

            "authorId": 1,
            "editionYear": 2018,
            "title": "Test",
            "categoryId": 1,
            "languageId": 1,
            "synopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
            "availabilityId": 2,
            "userId": userDescribe.id

        }

        bookNoAvailability = await createBook(dataBookNoAvailability)
        

       
        
    })


    describe('Registro de intercambio', function () {
       
        it('Requiere que los userId de intercambio sean el mismo',async function () {
            await updateBook(bookDescribeTwo.id,userDescribe.id)
            return request(app)
                .post('/exchange')
                .send({
                    "bookId1": bookDescribe.id,
                    "bookId2": bookDescribeTwo.id,
                    "date": "2022-11-18"
                })
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'ERROR_SAME_USERS')
                })
        })

       it('Requiere los libros que no existen', function (done) {

            request(app)
                .post('/exchange')
                .send({
                    "bookId1": 2565,
                    "bookId2": 3,
                    "date": "2022-11-18"
                })
                .expect(400)
                .end(function (err, res) {
                    console.log(res.body.message);
                    assert.equal(res.body.message, 'BOOK_IS_UNDEFINED')
                    if (err) done(err);
                    return done();
                })

        })

        it('Requiere que el libro se encuentre disponible', async function () {

            return request(app)
                .post('/exchange')
                .send({
                    "bookId1": bookNoAvailability.id,
                    "bookId2": 3,
                    "date": "2022-11-22"
                })
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'BOOK_DON\'T_AVAILABLE')
                })
                

        })

       it('Requiere que los usuarios intervinientes se encuentren habilitados', async function () {
        usersRepo.changeStatus(userDescribeEnable.id,NOTENABLE)
        await updateBook(bookDescribeTwo.id,userDescribeEnable.id)    
                return request(app)
                .post('/exchange')
                .send({
                    "bookId1": bookDescribeTwo.id,
                    "bookId2": bookDescribe.id,
                    "date": "2022-11-18"
                })
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'USER_DON\'T_ENABLE')
                })
        })
        it('Requiere un codigo 201 registrar correctamente el intercambio',function (done) {
         
            request(app)
               .post('/exchange')
               .send({
                   "bookId1": bookDescribe.id,
                   "bookId2": bookDescribeTwo.id,
                   "date": "2022-11-18"
               })
            .expect('Content-Type', /json/)
            .expect(201,done)
            
       })
       it('Requiere un codigo 201 registrar correctamente el intercambio',function (done) {
        request(app)
           .post('/exchange')
           .send({
               "bookId1": bookDescribe.id,
               "bookId2": bookDescribeTwo.id,
               "date": "2022-11-22"
           })
        .expect('Content-Type', /json/)
        .expect(201,done)
        
       })
       it('Se requiere obtener una respuesta "NOT_FOUND", al intentar obtener un exchange con id invalido o no existente en la base de datos',  function(done) {
              request(app)
            .get('/exchange/' + 1234)
            .expect(404,done)

       })
    })


    afterEach(async function () {
        await deleteUser(userDescribe.id)
        await deleteUser(userDescribeTwo.id)
        await deleteUser(userDescribeEnable.id)
        await deleteBook(bookDescribe.id)
        await deleteBook(bookDescribeTwo.id)
        await deleteBook(bookNoAvailability .id)
        await deleteExchange(bookDescribe.id)
    });
    
    
})