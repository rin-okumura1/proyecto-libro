async function getAll(){
  return await Users.findAll()
  }
  
async function getById(id){
    return await users.findById(id)
    }
    const {Users}=require("D:\ort\2 anio\tp2\proyecto libros\db\models")
const users = require("../../db/models/users")
    
    module.exports={
        getById,
        getAll
    }