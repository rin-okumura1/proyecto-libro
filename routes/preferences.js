var express = require("express");
var router = express.Router();

const authors = require('../src/repositories/authors')
const categories = require('../src/repositories/categories')
const languages = require('../src/repositories/languages')
const users = require('../src/repositories/users')
const categories_users = require('../src/repositories/categories_users')
const languages_users = require('../src/repositories/languages_users')
const authors_users = require('../src/repositories/authors_users')

// en todos los endpoints 'filter' puede ser categories, languages o authors
//lectura de preferencias de usuario 
router.get('/:filter/:userId', async function (req, res, next) {

    let userId = req.params.userId
    let filter = req.params.filter

    try {

        if (filter == 'categories') {
            return await users.getByIdWithCategories(userId).then((data) => {
                res.json(data)
            })
        }

        if (filter == 'languages') {
            return await users.getByIdWithLanguages(userId).then((data) => {
                res.json(data)
            })
        }

        if (filter == 'authors') {
            return await users.getByIdWithAuthors(userId).then((data) => {
                res.json(data)
            })
        }

    } catch (error) {
        console.log("error going to DB: " + error)
        res.status(500)
    }
    res.status(400).json({ message: 'error reading preferences' })
});

//registro de preferencia de usuario
router.post('/:filter/:userId', async function (req, res, next) {
    let userId = req.params.userId
    let filter = req.params.filter
    let body = req.body
    console.log(body)
    try {

        if (filter == 'categories') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let category = await categories.existingCategory(body.name)


            if (category) {

                return await categories_users.saveFavoriteCategory(userId, category.dataValues.id).then((data) => {
                    res.status(201).json(data)
                })
            } else {
                
                res.status(400).json({ message: 'CATEGORY_NOT_FOUND' })
            }
        }

        if (filter == 'languages') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let language = await languages.existingLanguage(body.language)
            console.log(language)
            if (language) {

                return await languages_users.saveFavoriteLanguage(userId, language.dataValues.id).then((data) => {
                    res.status(201).json(data)
                })
            } else {
               
                res.status(400).json({ message: 'LANGUAGE_NOT_FOUND' })
            }
        }


        if (filter == 'authors') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let author = await authors.existingAuthors(body.name)
            console.log(author)
            if (author) {

                return await authors_users.saveFavoriteAuthor(userId, author.dataValues.id).then((data) => {
                    res.status(201).json(data)
                })
            } else {
                res.status(400).json({ message: 'AUTHOR_NOT_FOUND' })
            }
        }

    } catch (error) {
        console.log("internal error: " + error)
        res.status(500)
    }
    res.status(400).json({ message: 'error reading preferences' })
});

//eliminacion de preferencia de usuario
router.delete('/:filter/:id', async function (req, res, next) {
    let userId = req.params.id
    let filter = req.params.filter
    let body = req.body

    try {
        if (filter == 'categories') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let category = await categories.existingCategory(body.name)


            if (category) {

                return await categories_users.deleteFavoriteCategory(userId, category.dataValues.id).then((data) => {
                    res.json(data)
                })
            } else {
                throw new Error('CATEGORY_NOT_FOUND')
            }
        }

        if (filter == 'languages') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let language = await languages.existingLanguage(body.language)
            console.log(language)
            if (language) {

                return await languages_users.deleteFavoriteLanguage(userId, language.dataValues.id).then((data) => {
                    res.json(data)
                })
            } else {
                throw new Error('LANGUAGE_NOT_FOUND')
            }
        }


        if (filter == 'authors') {

            if (!body) {
                throw new Error('BAD_REQUEST')
            }

            let author = await authors.existingAuthors(body.name)
            console.log(author)
            if (author) {

                return await authors_users.deleteFavoriteAuthor(userId, author.dataValues.id).then((data) => {
                    res.json(data)
                })
            } else {
                throw new Error('AUTHOR_NOT_FOUND')
            }
        }


    } catch (error) {
        console.log("internal error: " + error)
        res.status(500)
    }
    res.status(400).json({ message: 'error reading preferences' })
});

module.exports = router;
