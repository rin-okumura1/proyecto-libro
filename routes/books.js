var express = require("express");
var router = express.Router();

const books = require('../src/repositories/books')
var users = require('../src/repositories/users')
var authors = require('../src/repositories/authors')
var categories = require('../src/repositories/categories')
var languages = require('../src/repositories/languages');
//const { Error } = require("sequelize");

async function bookValidation (dataBook) {

    const {authorId, editionYear, title, categoryId, languageId, synopsis, userId, price } = dataBook;

    if (!userId || ! await users.getById(userId)) { 
        throw new Error('USER_DOES_NOT_EXIST')
      }

    if (!authorId || ! await authors.getAuthorById(authorId)) { 
        throw new Error('AUTHOR_DOES_NOT_EXIST')
    }

    if (!categoryId || ! await categories.getCategoryById(categoryId)) { 
        throw new Error('CATEGORY_DOES_NOT_EXIST')
    }

    if (!languageId || ! await languages.getLanguageById(languageId)) { 
        throw new Error('LANGUAGE_DOES_NOT_EXIST')
    }

    if (!editionYear || editionYear <= 0) { 
        throw new Error('INVALID_EDITION_YEAR')
    }

    if (!title || (title.length < 1 || title.length > 100)) { 
        throw new Error('INVALID_TITLE')
    }

    if (!synopsis || (synopsis.length < 1 || synopsis.length > 255)) { 
        throw new Error('INVALID_SYNOPSIS')
    }

    if (price <= 0) { 
        throw new Error('INVALID_PRICE')
    }
}


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
       return res.json(data)
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

// Dar de alta un nuevo libro
router.post('/', async function (req, res, next) {

    let dataNewBook = req.body;
    
    try {
        if(!dataNewBook) {
            throw new Error('BAD_REQUEST')
        }

        await bookValidation(dataNewBook);
        
        const {authorId, editionYear, title, categoryId, languageId, synopsis, userId, price } = dataNewBook;
        let createdBook = await books.createBook(authorId, editionYear, title, categoryId, languageId, synopsis, userId, price);
        res.status(201).json(createdBook);
        
    }catch(error) {
        res.status(400).json({message: error.message});
    }

});

router.put('/:bookId', async function (req, res, next) {

    let bookId = req.params.bookId;
    let bookToModify = await books.getBookById(bookId)
    let dataToModifyBook = req.body;
    try {
        if(!bookToModify || !dataToModifyBook) {
            throw new Error('BAD_REQUEST')
        }
        
        if(! await books.isAvailable(bookId)) {
            throw new Error("BOOK_DON'T_AVAILABLE")
        }
        
        await bookValidation(dataToModifyBook);

        let updatedBook = await books.updateBook(bookId, dataToModifyBook);
        res.status(200).json(updatedBook);
          
    }catch(error) {
        res.status(400).json({message: error.message});
    }

});

router.delete('/:bookId', async function (req, res, next) {

    let bookId = req.params.bookId;
    let bookToDelete = await books.getBookById(bookId)
    
    try {
        if(!bookToDelete) {
            throw new Error('BAD_REQUEST')
        }

        if(! await books.isAvailable(bookId)) {
            throw new Error("BOOK_DON'T_AVAILABLE")
        }

        let deletedtedBook = await books.deleteBook(bookId);
        res.status(200).json(deletedtedBook);
        
    }catch(error) {
        res.status(400).json({message: error.message});
    }

});

module.exports = router;
