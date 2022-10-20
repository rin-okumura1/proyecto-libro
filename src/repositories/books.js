const { book, author, category, availability, language, rentalPrice, Users, Status } = require('../../db/models');
const { Op } = require('sequelize')

const getAllBooks = async (params = {}) => {
    
    // Para la búsqueda sin "req.query"
    let query = {
        where: {

        },
        attributes: { exclude: ['userId', 'authorId', 'categoryId', 'availabilityId', 'languageId', 'createdAt', 'updatedAt'] },
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
            },
            { 
                model: Users ,
                attributes: ['id', 'name', 'surname', 'email'],
                include: {
                    model: Status,
                    attributes: ['id', 'state']
                }
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


module.exports = {
    getBookById,
    getAllBooks,
}