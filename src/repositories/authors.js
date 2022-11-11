const { book, author } = require('../../db/models');

const getAllAuthorsWithBooks = async () => {
    return await author.findAll({
        include: [{ model: book}]
    })
};

const getAuthorById = async (id) => {
    return await author.findByPk(id);
};

module.exports = {
    getAllAuthorsWithBooks,
    getAuthorById
}