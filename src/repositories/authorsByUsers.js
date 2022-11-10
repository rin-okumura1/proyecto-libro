const {authorsbyuser} = require('../../db/models')
const { Op } = require('sequelize')
 
async function getAllByUser(userId){
    return await authorsbyuser.findAll(
        query.where.userId = {
            [Op.eq]: userId
        }

    )
}

async function saveByUser(body){
    return await authorsbyuser.create(body)
}

async function deleteByUser(body){
    return await authorsbyuser.destroy(
        query.where.userId = {
            [Op.eq]: body.userId
        },query.where.authorId = {
            [Op.eq]: body.authorId
        }
    )
}

module.exports={
    getAllByUser,
    saveByUser,
    deleteByUser
}