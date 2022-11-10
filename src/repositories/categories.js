const {Category} = require('../../db/models')

async function getAllByUser(categoriesIds){
    return await Category.findAll(
        {
            where:{
                id:categoriesIds
            },
            attributes:['name']
        }
    )
}

async function getByName(categoryName){
    return await Category.findOne(
        {
            where:{
                name:categoryName
            }
            
        }
    )
}

module.exports={
    getAllByUser,
    getByName
}