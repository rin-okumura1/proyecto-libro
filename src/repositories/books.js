const { book, author, category } = require('../../db/models');

const getAllBooks = async () => {
    return await book.findAll({
        attributes: { exclude: ['authorId', 'categoryId']},
        include: [
            { 
                model: author, 
                attributes: ['id', 'name'] 
            },
            { 
                model: category ,
                attributes: ['id', 'name']
            }
         ]
    });
};

const getBookById = async (id) => {
    return await book.findByPk(id, {
        attributes: { exclude: ['authorId']},
        include: [
            { model: author 
            },
            { model: category }
         ]
    });
};


module.exports = {
    getBookById,
    getAllBooks
}