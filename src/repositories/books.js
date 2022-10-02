const { Book } = require('../../db/models')

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (id) => {
    return await Book.findByPk(id);
};

const getBooksByQueryString = (operationId, authors, titles, categories, languages) => {
    const booksFound = books.filter(book => (book.operationId == operationId || book.author == authors
        || book.title == titles || book.category == categories || book.language == languages));
    if(booksFound) {
        return booksFound;
    }
};

module.exports = {
    getBookById,
    getBooksByQueryString,
    getAllBooks
}