var express = require("express");
var router = express.Router();

const authors = require('../src/repositories/authors')
const categories = require('../src/repositories/categories')
const lenguages = require('../src/repositories/lenguages')
const authorsByUser = require('../src/repositories/authorsByUsers')
const categoriesByUser = require('../src/repositories/categoriesByUsers')
const languagesByUser = require('../src/repositories/languagesByUsers')

// en todos los endpoints 'filter' puede ser categories, languages o authors

//lectura de preferencias de usuario 
router.get('/preferences/:filter/:userId', async function (req, res, next) {

    let userId = req.params.userId
    let filter = req.query.filter

    try {
        
    if(filter == 'categories'){
        let categoriesId  = categoriesByUser.getAllByUser(userId)
        return await categories.getAllByUser(categoriesId).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'lenguages'){
        let languagesIds  = languagesByUser.getAllByUser(userId)
        return await lenguages.getAllByUser(languagesIds).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'authors'){
        let authorsIds  = authorsByUser.getAllByUser(userId)
        return await authors.getAllByUser(authorsIds).then((data) => {
            res.json(data)
        })
    }

    } catch (error) {
        console.log("error going to DB: "+error)
        res.status(500)
    }
    res.status(400).json({message: 'error reading preferences'})

});

//registro de preferencia de usuario
router.post('/preferences/:filter/:userId', async function (req, res, next) {
    let userId = req.params.userId
    let filter = req.query.filter
    let body = req.body

    try {

    if(filter == 'categories'){
        let {categoryFound} = categories.getByName(body.category.name)
        return await categoriesByUser.save(userId, category.id).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'lenguages'){
        let {languageFound} = categories.getByName(body.category.name)
        return await languagesByUser.save(userId, languageFound.id).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'authors'){
        let {authorFound} = authors.getByName(body.category.name)
        return await  authors.save(userId, authorFound.id).then((data) => {
            res.json(data)
        })
    }

    } catch (error) {
        console.log("internal error: "+ error)
        res.status(500)
    }
    res.status(400).json({message: 'error reading preferences'})
});

//eliminacion de preferencia de usuario
router.delete('/preferences/:filter/:id', async function (req, res, next) {
    let userId = req.params.userId
    let filter = req.query.filter
    let body = req.body

    try {
    if(filter == 'categories'){
        let {categoryFound} = categories.getByName(body.category.name)
        return await categoriesByUser.delete(userId, categoryFound.id).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'lenguages'){
        let {languageFound} = categories.getByName(body.language.language)
        return await languagesByUser.delete(userId, languageFound.id).then((data) => {
            res.json(data)
        })
    }

    if(filter == 'authors'){
        let {authorFound} = categories.getByName(body.author.name)
        return await  authorsByUser.delete(userId, authorFound.id).then((data) => {
            res.json(data)
        })
    }

    } catch (error) {
        console.log("internal error: "+ error)
        res.status(500)
    }
    res.status(400).json({message: 'error reading preferences'})
});


module.exports = router;
