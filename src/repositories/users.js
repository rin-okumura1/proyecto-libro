
const {Users,Status}=require("../../db/models")

async function getAll(){

  return await Users.findAll({include:[Status]})
  }
  
async function getById(id){
  return await Users.findByPk(id)
    }
    

    
    module.exports={
        getById,
        getAll
    }