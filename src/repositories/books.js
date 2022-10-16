const { book, author, category, availability, language, rentalPrice } = require('../../db/models');
const { Op } = require('sequelize')

const getAllBooks = async (params = {}) => {
    
    // Para la búsqueda sin "req.query"
    let query = {
        where: {

        },
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
        
    }

    // Para la búsqueda cuando se requieren filtrar Books por el título
    if(params.title) {
        query.where.title = {
                [Op.substring]: params.title
            }
    }

    // Para la búsqueda cuando se requieren filtrar Books por el lenguaje
    if(params.languageId) {
        query.where.languageId = {
            [Op.eq]: params.languageId
        }
    }
    
    return await book.findAll(query);
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

const saveBook = async (authorId, editionYear, title, categoryId, languageId, synopsis, userId) => {
    return await book.create({
        authorId,
        editionYear,
        title,
        categoryId,
        languageId,
        synopsis,
        userId
    })
}


module.exports = {
    getBookById,
    getAllBooks,
    saveBook,
}