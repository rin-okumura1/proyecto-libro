const { assert } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Users } = require('../db/models')

async function createUser(name, surname, email, password) {
    return await Users.create({
        name,
        surname,
        email,
        password,
    
      });
  }

async function deleteUser (userId) {
    return await Users.destroy({
        where: {
            id: userId
        }
    });
};


describe('User Tests', function() {
    describe('Alta de usuario', function() {
        let userId;

        before(async function() {
            console.log('BEFORE TEST CREATE USER');
            let userCreated = await createUser('Alexis', 'Blanca', 'mismoEmail@gmail.com', '12345678');
            userId = userCreated.id;
        })
    
        after(async function() {
            console.log('AFTER TEST CREATE USER');
            await deleteUser(userId);
            
        })
       
        it('Se espera un status code = 400 al dar de alta un usuario sin la estructura JSON con TODOS los campos obligatorios', async function() {

            return request(app)
                .post('/Users')
                .send({})
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'BAD_REQUEST')

                })

        })

        it('Se espera un status code = 400 al dar de alta un usuario con un Nombre inválido (de 1 a 100 caracteres)', function(done) {

            request(app)
                .post('/Users')
                .send(
                    {
                        "name": "",
                        "surname": "Lopez",
                        "email": "tryton5.shreyas@fallinhay.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_NAME')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Se espera un status code = 400 al dar de alta un usuario con un Apellido inválido (de 1 a 100 caracteres)', function(done) {

            request(app)
                .post('/Users')
                .send(
                    {
                        "name": "Adrián",
                        "surname": "",
                        "email": "tryton5.shreyas@fallinhay.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_SURNAME')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Se espera un status code = 400 al dar de alta un usuario con un Email inválido (sin el caractér "@")', function(done) {

            request(app)
                .post('/Users')
                .send(
                    {
                        "name": "Adrián",
                        "surname": "Cáceres",
                        "email": "tryton5.shreyasfallinhay.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_EMAIL')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Se espera un status code = 400 al dar de alta un usuario con una Contraseña inválida (longitud de caracteres < 8 y > 12)', function(done) {

            request(app)
                .post('/Users')
                .send(
                    {
                        "name": "Adrián",
                        "surname": "Cáceres",
                        "email": "tryton5.shreyas@fallinhay.com",
                        "password": "123456"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_PASSWORD')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Se espera un status code = 400 al dar de alta un usuario con un Email que ya existe en la DB', function(done) {

            request(app)
                .post('/Users')
                .send(
                    {
                        "name": "Lucas",
                        "surname": "Romero",
                        "email": "mismoEmail@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    assert.equal(res.body.message, 'BAD_EMAIL')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Se espera un status code = 200 al dar de alta un usuario de manera éxitosa', function() {

            return request(app)
                .post('/Users')
                .send(
                    {
                        "name": "Lisa",
                        "surname": "Simpson",
                        "email": "lisa.simpson@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(201)
                .then(async (res) => {
                    assert.isObject(res.body, 'La respuesta de la petición no es un objeto');
                    await deleteUser(res.body.id);
                })

        })

    });

    describe('Modificación de usuario', function() {
       
        let userId, badUserId = 5698;;

        before(async function() {
            console.log('BEFORE TEST EDIT USER');
            let userCreated = await createUser('Martina', 'Peruchi', 'martiperuchi@gmail.com', '12345678');
            userId = userCreated.id;
        })
    
        after(async function() {
            console.log('AFTER TEST EDIT USER');
            await deleteUser(userId);
            
        })

        it('Se espera obtener un status doce = 400 al enviar un objeto vacío para editar los atributos de un usuario', async function() {

            return request(app)
                .put('/Users/' + userId)
                .send({})
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'BAD_REQUEST')

                })
        })

        it('Se requiere que el usuario que se desea editar, debe estar dado de alta en la DB', async function() {

            return request(app)
                .put('/Users/' + badUserId)
                .send(
                    {
                        "name": "Manola",
                        "surname": "Lola",
                        "email": "manolita@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .then( res => {
                    assert.equal(res.body.message, 'BAD_REQUEST')

                })
        })

        it('Se espera obtener un status code = 400 al editar un usuario existente, con un Nombre inválido (de 1 a 100 caracteres)', async function() {
            return request(app)
                .put('/Users/' + userId)
                .send(
                    {
                        "name": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas",
                        "surname": "Sipmson",
                        "email": "lsimpson@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .then(async (res) => {
                    assert.equal(res.body.message, 'BAD_NAME')
                })
        })

        it('Se espera obtener un status code = 400 al editar un usuario existente, con un Apellido inválido (de 1 a 100 caracteres)', async function() {
            return request(app)
                .put('/Users/' + userId)
                .send(
                    {
                        "name": "Lisa",
                        "surname": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mas",
                        "email": "lsimpson@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .then((res) => {
                    assert.equal(res.body.message, 'BAD_SURNAME')
                })
        })

        it('Se espera obtener un status code = 400 al editar un usuario existente, con una Contraseña inválida (longitud de caracteres < 8 y > 12)', async function() {
            return request(app)
                .put('/Users/' + userId)
                .send(
                    {
                        "name": "Lisa",
                        "surname": "Simpson",
                        "email": "lsimpson@gmail.com",
                        "password": "1234567890123456"
                    }
                )
                .expect(400)
                .then((res) => {
                    assert.equal(res.body.message, 'BAD_PASSWORD')
                })
        })

        it('Se espera obtener un status code = 400 al modificar los datos de un usuario existente, intentando editar el Email, el cual es un campo No Editable', async function() {
            return request(app)
                .put('/Users/' + userId)
                .send(
                    {
                        "name": "Lisa",
                        "surname": "Simpson",
                        "email": "martiperuchi@gmail.com",
                        "password": "12345678"
                    }
                )
                .expect(400)
                .then((res) => {
                    assert.equal(res.body.message, 'EMAIL_FIELD_NOT_EDITABLE')
                })
        })

        it('Se espera obtener un status code = 200 al realizar una modificación éxitosa de los datos de un usuario existente', async function() {
            return request(app)
                .put('/Users/' + userId)
                .send(
                    {
                        "name": "Martina Daniela",
                        "surname": "Peruchi Simpson",
                        "password": "12345678"
                    }
                )
                .expect(201)
                .then((res) => {
                    assert.isNotEmpty(res.body, 'La respuesta del request no es un elemento vacío')
                })
        })
    });

})