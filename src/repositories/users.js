const {Users}=require("../../db/models")


async function getAll(){
  return await Users.findAll()
  }
  
async function getById(id){
    return await Users.findById(id)
    }
    

    
    module.exports={
        getById,
        getAll
    }