
const {Users,Status}=require("../../db/models")

async function getAll(){

  return await Users.findAll({include:[Status]})
  }
  
async function getById(id){
  return await Users.findByPk(id)
    }


async function checkUser(userId){
 return await getById(userId)
}
    
    module.exports={
        getById,
        getAll
    }