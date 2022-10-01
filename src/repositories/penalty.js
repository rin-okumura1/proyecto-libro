const {Penalty} = require ('../../db/models')

async function getById(id){
    return await Penalty.findByPk(id)
}
async function getAll(){
    return await Penalty.findAll()
}
module.exports = {
    getById, 
    getAll,
}