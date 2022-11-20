const {category} = require('../../db/models')
const { Op } = require('sequelize')

const getCategoryById = async (id) => {
    return await category.findByPk(id);
};

async function existingCategory(categoriesName){
    return await category.findOne(
        { where: { name: categoriesName } }
    )
}

module.exports={
    existingCategory,
    getCategoryById
}