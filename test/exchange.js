const { assert } = require('chai')
const request = require('supertest')
const app = require('../app')


describe('Exchange', function() {
    describe('Registro de intercambio', function() {
       
        
       it('Requiere que los dueños de los libros no tengan el mismo id', function(done) {

            request(app)
                .post('/exchange')
                .send(
                    {
                        "bookId1": 2,
                        "bookId2": 3,
                        "date": "2022-11-16"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    console.log(res.body.message);
                    assert.equal(res.body.message, 'ERROR_SAME_USERS')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Requiere que los libros existan', function(done) {

            request(app)
                .post('/exchange')
                .send(
                    {
                        "bookId1": 2565,
                        "bookId2": 3,
                        "date": "2022-11-16"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    console.log(res.body.message);
                    assert.equal(res.body.message, 'BOOK_IS_UNDEFINED')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Requiere que el libro se encuentre disponible', function(done) {

            request(app)
                .post('/exchange')
                .send(
                    {
                        "bookId1": 7,
                        "bookId2": 3,
                        "date": "2022-11-16"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    console.log(res.body.message);
                    assert.equal(res.body.message, 'BOOK_DON\'T_AVAILABLE')
                    if(err)  done(err);
                    return done();
                })

        })

        it('Requiere que los usuarios intervinientes se encuentren habilitados', function(done) {

            request(app)
                .post('/exchange')
                .send(
                    {
                        "bookId1": 8,
                        "bookId2": 3,
                        "date": "2022-11-16"
                    }
                )
                .expect(400)
                .end(function(err, res) {
                    console.log(res.body.message);
                    assert.equal(res.body.message, 'USER_DON\'T_ENABLE')
                    if(err)  done(err);
                    return done();
                })

        })


    })})