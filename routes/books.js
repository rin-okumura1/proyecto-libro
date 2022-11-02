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

router.post('/', async function (req, res, next) {

    let dataNewBook = req.body;
    const {authorId, editionYear, title, categoryId, languageId, synopsis, userId } = dataNewBook;
    try {
        if(dataNewBook) {
            let savedBook = await books.saveBook(authorId, editionYear, title, categoryId, languageId, synopsis, userId);
            res.status(201).json(savedBook);
        }
    }catch(error) {
        res.status(400).json({message: error});
    }

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
