const { book, author, category, availability } = require('../../db/models');

const getAllBooks = async () => {
    return await book.findAll({
        attributes: { exclude: ['authorId', 'categoryId', 'availabilityId']},
        include: [
            { 
                model: author, 
                attributes: ['id', 'name'] 
            },
            { 
                model: category ,
                attributes: ['id', 'name']
            },
            { 
                model: availability ,
                attributes: ['id', 'state']
            }
         ]
    });
};

const getBookById = async (id) => {
    return await book.findByPk(id, {
        attributes: { exclude: ['authorId', 'categoryId', 'availabilityId']},
        include: [
            { 
                model: author, 
                attributes: ['id', 'name'] 
            },
            { 
                model: category ,
                attributes: ['id', 'name']
            },
            { 
                model: availability ,
                attributes: ['id', 'state']
            }
         ]
    });
};


module.exports = {
    getBookById,
    getAllBooks
}