const { book, author, category, availability, language } = require('../../db/models');
const { Op } = require('sequelize')

const getAllBooks = async (params = {}) => {
    
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
            }
         ]
        
    }

    if(params.title) {
        query.where.title = {
                [Op.substring]: params.title
            }
    }

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
            }
         ]
    });
};

const findBooksByTitle = async (authorId) => {
    return await book.findAll({
        where: {
            authorId: {
                [Op.eq]: authorId
            }
        }
    });
};

module.exports = {
    getBookById,
    getAllBooks,
    findBooksByTitle,
}