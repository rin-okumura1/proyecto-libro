var express = require("express");
var router = express.Router();

const authors = require('../src/repositories/authors')

// en todos los endpoints 'filter' puede ser categories, languages o authors
//lectura de preferencias de usuario 
router.get('/', async function (req, res, next) {

    try {
        return await authors.getAll().then((data) => {
            res.json(data)
        })

    } catch (error) {
        console.log("error going to DB: " + error)
        res.status(500)
    }
    res.status(400).json({ message: 'error reading preferences' })
});

module.exports = router;
