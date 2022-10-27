const {lenguage} = require('../../db/models')

async function getAll(){
    return await lenguage.findAll()
}

module.exports={
    getAll
}