const {Rental} = require ('../../db/models')

async function getById(id){
    return await Rental.findByPk(id)
}
async function getAll(){
    return await Rental.findAll()
}
module.exports = {
    getById, 
    getAll,
}