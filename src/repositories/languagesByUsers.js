const {languagesbyuser} = require('../../db/models')
const { Op } = require('sequelize')
 
async function getAllByUser(userId){
    return await languagesbyuser.findAll({
       where: {
            userId
        },
        attribute:['languageId']
    }
    )
}

async function save(userId, languageId){
    return await languagesbyuser.create({userId,languageId})
}

async function deleteByUser(body){
    return await languagesbyuser.destroy(
        query.where.userId = {
            [Op.eq]: body.userId
        },query.where.languageId = {
            [Op.eq]: body.languageId
        }
    )
}
module.exports={
    getAllByUser,
    save,
    deleteByUser

}