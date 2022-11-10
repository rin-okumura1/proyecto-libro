var express = require("express");
var router = express.Router();

const authors = require('../src/repositories/authors');

//Devuelve todos los Authors con sus Books asociados
router.get('/', async function (req, res, next) {

    await authors.getAllAuthorsWithBooks()
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        res.json(error)
    }) 

});


module.exports = router;