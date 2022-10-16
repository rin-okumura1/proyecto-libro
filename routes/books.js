var express = require("express");
var router = express.Router();

const books = require('../src/repositories/books')

//Devuelve todos los registros de Libros almacenados en la DB, y puede filtrar los resultados encontrados, de acuerdo al Title y Language
router.get('/', async function (req, res, next) {

    const { title, languageId } = req.query;

    if(title || languageId) {
        return await books.getAllBooks({title, languageId})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            res.json(error)
        }) 
        }

    await books.getAllBooks()
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        res.json(error)
    }) 

    //res.json(await books.getAllBooks());
});

//Devuelve un libro de acuerdo a su ID
router.get('/:bookId', async (req, res) => {
    
    await books.getBookById(req.params.bookId)
    .then((data) => {
        if(data) {
            return res.json(data)
        }
        res.status(404).end()
    })
    .catch((error) => {
        res.json(error)
    })
    
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
