const { Book } = require('../../db/models')

const getAllBooks = async () => {
    return await Book.findAll();
};

const getBookById = async (id) => {
    return await Book.findByPk(id);
};


module.exports = {
    getBookById,
    getAllBooks
}