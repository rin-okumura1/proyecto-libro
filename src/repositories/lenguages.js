const {language} = require('../../db/models')

async function getAllById(ids){
    return await language.findAll(
        {
            where:{
                id:categoriesIds
            },
            attributes:['language']
        }
    )
}

module.exports={
    getAllById
}