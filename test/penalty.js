const { assert } = require('chai')
const request = require('supertest')
const app = require('../app')
var penalties = require('../src/repositories/penalty')
const { Users } = require("../db/models")


async function createUser() {
    const newdUser =await  Users.create({
        "name": "Juan",
        "surname": "Perez",
        "email": "juanperez@correo.com",
        "password": "123456",
       });

       return newdUser
    }
async function deleteUser() {
    let user = await Users.findOne({
        where: {
            email: "juanperez@correo.com"
        }
      })
    await user.destroy();
    return user;
        }

describe('Penalty', function() {

    
    describe('Registrar una penalidad', function() {

        before(async function ()  {
            console.log("before");
             await createUser()
            
            });
            
            
        it('Se requiere crear un registro de penalizacion a usuario', async function() {
            // crear un registro en el cual el usuario no este registrado en la tabla de penalidades
            console.log("it");
            
            let user = await Users.findOne({
                where: {
                    email: "juanperez@correo.com"
                }
              })
            let uId = user.id

            console.log("el id" + uId);

            penalty= await penalties.getPenaltyByIdUser(uId)
            if (!penalty){
                 await penalties.generarPenalidad(uId)
            }
            penalty = await penalties.getPenaltyByIdUser(uId) 
            console.log(penalty);
            if (penalty.userId == uId){
                result=true
            }
            assert.equal(result,true)
        })

        after(async function ()  {
            console.log("after");
             await deleteUser()
            
            });

    })

    
        
        //------------------------------------------------------------------

       /* it('Se requiere aumentar la cantidad de penalidades con fecha dateTo no vigente', async function() {
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


     /*   //--------------------------------------------------------------------------
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


















