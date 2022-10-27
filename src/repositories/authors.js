const { book, author } = require('../../db/models');

const getAllAuthorsWithBooks = async () => {
    return await author.findAll({
        include: [{ model: book}]
    })
}

module.exports = {
    getAllAuthorsWithBooks
}