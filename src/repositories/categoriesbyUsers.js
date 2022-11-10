const {categoriesbyuser} = require('../../db/models')
const { Op } = require('sequelize')
 
async function getAllByUser(userIds){
    return await categoriesbyuser.findAll({

       where: {
            [Op.eq]: userId
        },
       attributes:['categoryId'] }
    )
}

async function save(userId, categoryId){
    return await categoriesbyuser.create({userId, categoryId})
}

async function deleteByUser(body){
    return await Category.destroy(
        query.where.userId = {
            [Op.eq]: body.userId
        },query.where.categoryId = {
            [Op.eq]: body.categoryId
        }
    )
}

module.exports={
    getAllByUser,
    save,
    deleteByUser
}