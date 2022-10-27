const {Category} = require('../../db/models')

async function getAll(){
    return await Category.findAll()
}

module.exports={
    getAll
}