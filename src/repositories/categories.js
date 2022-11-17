const {category} = require('../../db/models')
const { Op } = require('sequelize')


async function existingCategory(categoriesName){
    return await category.findOne(
        { where: { name: categoriesName } }
    )
}

module.exports={
    existingCategory
}