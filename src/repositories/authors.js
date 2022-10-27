const {Author} = require('../../db/models')

async function getAll(){
    return await Author.findAll()
}

module.exports={
    getAll
}