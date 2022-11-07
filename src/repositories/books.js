const { book, author, category, availability, language, rentalPrice, Users, Status } = require('../../db/models');
const { Op } = require('sequelize')
const AVAILABILITY = 1;

let query = {
    where: { },
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
};

const getAllBooks = async (params = {}) => {
    
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
    return await book.findByPk(id, query);
};

/* const createBook = async (authorId, editionYear, title, categoryId, languageId, synopsis, userId) => {
    return await book.create({
        authorId,
        editionYear,
        title,
        categoryId,
        languageId,
        synopsis,
        userId
    })
}; */

const createBook = async (authorId, editionYear, title, categoryId, languageId, synopsis, userId, price) => {
     const createdBook = await book.create({
            authorId,
            editionYear,
            title,
            categoryId,
            languageId,
            synopsis,
            userId
        });

    if(price) {
        const { id } = createdBook;
        await setPriceToBook(id, price)
    };
    
    return createdBook;
};

const updateBook = async (bookId, dataToModifyBook) => {

    if(dataToModifyBook.price) await setPriceToBook(bookId, dataToModifyBook.price)

    return await book.update({
        authorId: dataToModifyBook.authorId,
        editionYear: dataToModifyBook.editionYear,
        title: dataToModifyBook.title,
        categoryId: dataToModifyBook.categoryId,
        languageId: dataToModifyBook.languageId,
        synopsis: dataToModifyBook.synopsis
    },
    {
        where: {
            id: bookId
        }
    })
};

const setPriceToBook = async (bookId, price) => {
    const bookToRental = await rentalPrice.findOrCreate({
        where: {
            bookId
        },
        defaults: {
            price
        }
    })
    
    if(bookToRental) {
        return await rentalPrice.update({
            price
        },
        {
            where: {
                bookId
            }
        })
    }
};

//Verifica si el estado del libro es Disponible o No_Disponible
const isAvailable = async (bookId) => {
    let bookFound = await book.findByPk(bookId);
    const {availabilityId} = bookFound;
    return await availabilityId == AVAILABILITY;
}

const deleteBook = async (bookId) => {
    let bookDelete = await book.findOne({
        where: {
            id: bookId
        }
    });

    await rentalPrice.destroy({
        where: {
            bookId
        }
    })

    await bookDelete.destroy();
    return bookDelete;
};

module.exports = {
    getBookById,
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    isAvailable,
}