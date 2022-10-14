const { book, author, category, availability, language, rentalPrice } = require('../../db/models');

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
            },
            { 
                model: rentalPrice ,
                attributes: ['id', 'price']
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
            },
            { 
                model: rentalPrice ,
                attributes: ['id', 'price']
            }
         ]
    });
};

/* const getBookById = async (id) => {
    return await book.findByPk(id, {
        attributes: { exclude: ['authorId', 'categoryId', 'availabilityId', 'languageId', 'createdAt', 'updatedAt'] },
        include: [author, category]
    });
}; */

const saveBook = async () => {
    return await book.create({

    })
}


module.exports = {
    getBookById,
    getAllBooks
}