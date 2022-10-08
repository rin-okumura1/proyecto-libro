const { book, author, category, availability, language } = require('../../db/models');

const getAllBooks = async () => {
    return await book.findAll({
        attributes: { exclude: ['authorId', 'categoryId', 'availabilityId', 'languageId', 'createdAt', 'updatedAt'] },
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
            },
            { 
                model: language ,
                attributes: ['id', 'language']
            }
         ]
    });
};

const getBookById = async (id) => {
    return await book.findByPk(id, {
        attributes: { exclude: ['authorId', 'categoryId', 'availabilityId', 'languageId', 'createdAt', 'updatedAt'] },
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
            },
            { 
                model: language ,
                attributes: ['id', 'language']
            }
         ]
    });
};


module.exports = {
    getBookById,
    getAllBooks
}