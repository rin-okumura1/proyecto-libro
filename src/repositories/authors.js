const { book, author } = require('../../db/models');

const getAllAuthorsWithBooks = async () => {
    return await author.findAll({
        include: [{ model: book}]
    })
}

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


module.exports = {
    getAllAuthorsWithBooks,
    getAllById,
    getByName,
    save
}