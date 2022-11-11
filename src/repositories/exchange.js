const {Exchange} = require ('../../db/models')

async function getById(id){
    return await Exchange.findByPk(id)
}
async function getAll(){
    return await Exchange.findAll()
}
module.exports = {
    getById, 
    getAll,
}