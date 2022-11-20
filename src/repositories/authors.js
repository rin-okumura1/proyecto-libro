const { book, author } = require('../../db/models');

const getAll = async () => {
    return await author.findAll({
    })
};


const getAllAuthorsWithBooks = async () => {
    return await author.findAll({
        include: [{ model: book}]
    })
};

const getAuthorById = async (id) => {
    return await author.findByPk(id);
};

async function getAllById(ids){
    return await author.findAll({

       where: {
            id: ids
        },
       attributes:['name'] }

    )
}

async function save(userId, authorId){
    return await author.create({userId, authorId})
}


async function getByName(authorName){
    return await author.findOne({
        where: {
             name: authorName
         }
        }
     )

}

const existingAuthors = async (nameToFind) => {
    return await author.findOne(
        { where: { name: nameToFind  } }
    )
};


module.exports = {
    getAllAuthorsWithBooks,
    getAllById,
    getAll,
    getByName,
    save,
    getAuthorById, 
    existingAuthors
}