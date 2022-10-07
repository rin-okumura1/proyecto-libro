var express = require("express");
var router = express.Router();

const books = require('../src/repositories/books')

//Devuelve todos los registros de Libros almacenados en la DB
router.get('/', async function (req, res, next) {
    res.json(await books.getAllBooks());
});

//Devuelve un libro de acuerdo a su ID
router.get('/:bookId', async (req, res) => {
    let bookFound = await books.getBookById(req.params.bookId);
    
    if(bookFound) {
        return res.json(bookFound);
    }

    res.status(404).end();
});

/* router.get('/', function (req, res, next) {
    const { operationId, authors, titles, categories, languages } = req.query;
    let booksFound;
    if(operationId || authors || titles || categories || languages) {
        booksFound = getBooksByQueryString(operationId, authors, titles, categories, languages);
    }
    if(booksFound) {
        res.status(200).json(booksFound);
    }else {
        res.status(200).json(books);
    }
    //res.status(200).json({operationId, authors, titles, categories, languages});
}); */


module.exports = router;
