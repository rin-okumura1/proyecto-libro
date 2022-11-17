const { assert } = require('chai')
const request = require('supertest')
const app = require('../app')
var penalties = require('../src/repositories/penalty')
const { Users, Penalty } = require("../db/models")



async function createUser(data) {
const { name, surname, email, password } = data;
    const newdUser =await  Users.create({
        "name": name,
        "surname": surname,
        "email": email,
        "password": password,
       });

       return newdUser
    }

    async function createPenalty(data) {
        const { userId, cantPenalty, dateTo } = data;
            const newdPenalty =await  Users.create({
                "userId": userId,
                "cantPenalty": cantPenalty,
                "dateTo": dateTo
               });
        
               return newdPenalty
            }
async function deleteUser(e) {
    let user = await Users.findOne({
        where: {
            email: e
        }
      })
    await user.destroy();
    return user;
        }

 async function deletePenalty(uId) {
            let penalty = await Penalty.findOne({
                where: {
                    "userId": uId
                }
              })
            await penalty.destroy();
            return penalty ;
                }

describe('Penalty', function() {


    describe('Registrar una penalidad', function() {


        before(async function ()  {
            let newUser = {
                 "name": "Juan",
                 "surname": "Perez",
                 "email": "juanperez@correo.com",
                 "password": "123456"
            }
             await createUser(newUser)
            
            });
        it('Se requiere crear un registro de penalizacion a usuario', async function() {
            // crear un registro en el cual el usuario no este registrado en la tabla de penalidades
            
            let user = await Users.findOne({
                where: {
                    email: "juanperez@correo.com"
                }
              })
            let uId = user.id
            
            let penalty= await penalties.getPenaltyByIdUser(uId)
            if (!penalty){
                 await penalties.generarPenalidad(uId)
            }
            penalty = await penalties.getPenaltyByIdUser(uId) 
            if (penalty.userId == uId){
                result=true
            }
            assert.equal(result,true)
        })

        after(async function ()  {
             let userDelete= await deleteUser("juanperez@correo.com")
             uId = userDelete.id
             await deletePenalty(uId)
            });

        })   
//----------------------------------------------------------------------------------------------
  /*              it('Se requiere aumentar la cantidad de penalidades con fecha dateTo no vigente', async function() {
    // tener un registro en el cual el usuario este en la tabla de penalidades con fecha dateto vencida
    let userId=5
    let beforeCantPenalty
    let afterCantPenalty

    let penalty= await penalties.getPenaltyByIdUser(userId)
    
    beforeCantPenalty = penalty.cantPenalty
   

    if (!penalty){
         await penalties.generarPenalidad(userId)
    }
    
    penalty = await penalties.getPenaltyByIdUser(userId) 
    afterCantPenalty = penalty.cantPenalty

    console.log(beforeCantPenalty);
    console.log(afterCantPenalty);
    
    if (beforeCantPenalty<afterCantPenalty){
        result=true
    }
    assert.equal(result,true)
})



 */       
        //------------------------------------------------------------------

       /*  //--------------------------------------------------------------------------
        it('Se requiere aumentar la cantidad de penalidades y actualizar dateTo vigente', async function() {
            // tener un registro en el cual el usuario este en la tabla de penalidades con fecha dateto vigente
            let userId=5
            let beforeCantPenalty
            let afterCantPenalty

            let penalty= await penalties.getPenaltyByIdUser(userId)
            beforeCantPenalty = penalty.cantPenalty
            console.log(penalty.cantPenalty); 

            if (!penalty){
                 await penalties.generarPenalidad(userId)
            }
            
            penalty = await penalties.getPenaltyByIdUser(userId) 
            console.log(penalty.cantPenalty); 
            afterCantPenalty = penalty.cantPenalty

            if (beforeCantPenalty>afterCantPenalty){
                result=true
            }
            assert.equal(result,true)
        })


        //--------------------------------------------------------------------------------

        it('Se requiere cambiar el estado del usuario cuando la cantidad de penalidad supere el maximo de 10', async function() {
            // tener un registro en el cual el usuario tenga 10 penalidades
            let userId=4
            penalty= await penalties.getPenaltyByIdUser(userId)
            if (!penalty){
                 await penalties.generarPenalidad(userId)
            }
            penalty = await penalties.getPenaltyByIdUser(userId) 
            if (penalty){
                result=true
            }
            assert.equal(result,true)
        })
        */










    });


















