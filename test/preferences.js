
const request = require('supertest');
const app = require('../app')
const { assert } = require('chai')
const { Users, authors_users, categories_users, languages_users } = require('../db/models')

describe("Preferences", function () {

    describe("save preferences ", function () {
        let userId;
        before(async function () {
            console.log('Going to insert test user');
            let user = await Users.create({
                "name": "nombreTest",
                "surname": "apellidoTest",
                "email": "somoEmail@fallinhay.com",
                "password": "98765876"
            })
            userId = user.dataValues.id
            console.log('user id for test: ' + userId)

        })

        after(async function () {
            console.log('Going to delete user and preferences');
            let userToDelete = await Users.findOne({
                where: {
                    surname: "apellidoTest"
                }
            })
            await Users.destroy({
                where: {
                    surname: "apellidoTest"
                }
            })

            languages_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            authors_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            categories_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })


        })

        it("existing category", function (done) {

            request(app)
                .post('/preferences/categories/' + userId)
                .send({ "name": "Teatro" })
                .expect(201, done)
        })



        it("unexisting category ", function (done) {

            request(app)
                .post('/preferences/categories/' + userId)
                .send({ "name": "invalid category" })
                .expect(400)
                .end(function (err, res) {
                    assert.equal(res.body.message, 'CATEGORY_NOT_FOUND')
                    if (err) done(err);
                    return done();
                })
        })
        it("existing language", function (done) {

            console.log("LANGUAGES" + '/preferences/languages/' + userId)
            request(app)
                .post('/preferences/languages/' + userId)
                .send({ "language": "Francés" })
                .expect(201, done)
        })

        it("unexisting language ", function (done) {

            request(app)
                .post('/preferences/languages/' + userId)
                .send({ "language": "Invalid language" })
                .expect(400)
                .end(function (err, res) {
                    assert.equal(res.body.message, 'LANGUAGE_NOT_FOUND')
                    if (err) done(err);
                    return done();
                })
        })

        it("existing author ", function (done) {

            request(app)
                .post('/preferences/authors/' + userId)
                .send({ "name": "Astrid Lindgren" })
                .expect(201, done)
        })
        it("unexisting author ", function (done) {

            request(app)
                .post('/preferences/authors/' + userId)
                .send({ "name": "Invalid author" })
                .expect(400)
                .end(function (err, res) {
                    assert.equal(res.body.message, 'AUTHOR_NOT_FOUND')
                    if (err) done(err);
                    return done();
                })
        })

    })

    describe("read preferences ", function () {

        let userId;
        let userIdWOFavorites;

        before(async function () {
            console.log('Going to insert test user');
            let user = await Users.create({
                "name": "nombreTest",
                "surname": "apellidoTest",
                "email": "somoEmail@fallinhay.com",
                "password": "98765876"
            })
            userId = user.dataValues.id

            let userWOFavs = await Users.create({
                "name": "nombreTestOtro",
                "surname": "apellidoTestOtro",
                "email": "somoEmailOther@fallinhay.com",
                "password": "98765876"
            })
            userIdWOFavorites = userWOFavs.dataValues.id

            categories_users.create({ user_id: userId, category_id: 8 })
        })

        after(async function () {
            console.log('Going to delete user and preferences');
            let userToDelete = await Users.findOne({
                where: {
                    surname: "apellidoTest"
                }
            })
            await Users.destroy({
                where: {
                    surname: "apellidoTest"
                }
            })

            languages_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            authors_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            categories_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })


        })

        it("read user with favorite category", function (done) {

            request(app)
                .get('/preferences/categories/' + userId)
                .expect(200)
                .end(function (err, res) {
                    assert.equal(res.body.categories[0].name, 'Poesia')

                    if (err) done(err);
                    return done();
                })
        })
        it("read user without favorites ", function (done) {

            request(app)
                .get('/preferences/categories/' + userIdWOFavorites)
                .expect(200)
                .end(function (err, res) {
                    assert.isEmpty(res.body.categories)

                    if (err) done(err);
                    return done();
                })
        })
    })
    describe("delete preferences ", function () {
        let userId;
       
        before(async function () {
            console.log('Going to insert test user');
            let user = await Users.create({
                "name": "nombreTest",
                "surname": "apellidoTest",
                "email": "somoEmail@fallinhay.com",
                "password": "98765876"
            })
            userId = user.dataValues.id
            
            categories_users.create({ user_id: userId, category_id: 8 })
        })

        after(async function () {
            console.log('Going to delete user and preferences');
            let userToDelete = await Users.findOne({
                where: {
                    surname: "apellidoTest"
                }
            })
            await Users.destroy({
                where: {
                    surname: "apellidoTest"
                }
            })

            languages_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            authors_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })
            categories_users.destroy({
                where: {
                    user_id: userToDelete.id
                }
            })


        })

        it("delete preference from user with favorite category", function (done) {

            request(app)
                .delete('/preferences/categories/' + userId)
                .send({ "name": "Teatro" })
                .expect(200, done)

        })
       

    })
})




