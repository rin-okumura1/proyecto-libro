const {Penalty, Users} = require ('../../db/models')
var date= require('./date')


const getAll = async (params = {}) => {
    let query = {
        where: {},
        attributes: { exclude: ['id'] },
        include: [
            { 
                model: Users ,
                attributes: ['id', 'name', 'surname', 'email']
            }]
}
return await Penalty.findAll(query);
};

const getById = async (id) => {
    return await Penalty.findByPk(id, {
        attributes: { exclude: ['id'] },
        include: [
            { 
                model: Users ,
                attributes: ['id', 'name', 'surname', 'email'],
            }
        ]
})
};

async function generarPenalidad(userId){
    
   let penalty = await getPenaltyByIdUser(userId)
   if (!penalty){  // si no existe registro de sanciones
    penalty=await createPenalty(userId)
  
   } 
   let dateNow = await date.getDateNow()
   let dateToPenalty = await date.setFormatDateToExpect(penalty.dateTo)
    
    if (penalty.cantPenalty<10){  // si la penalidad es menor a 10
       
    if (dateToPenalty <= dateNow){ // fecha vencida 
            updatedPenalty(penalty.id, penalty.cantPenalty)
       } 
    else {  // fecha vigente
        dateToPenalty= date.updateDateForPenalty (penalty.dateTo)  // actualiza el dateTo
        updatedPenalty(penalty.id, penalty.cantPenalty, dateToPenalty )
       }
    } 
    else {    // si la penalidad es mayor a 10 se cambia el status del usuario
      let user = await userRep.getById(userId)
      userRep.changeStatus(user.id,DISABLE)
    }
    
    
}

function getPenaltyByIdUser(userId){
    return  Penalty.findOne({
      where: {
        userId: userId
      }
    })
  }

async function createPenalty(userId){
let dateTo = date.getDateForPenalty()
    return await Penalty.create({
        userId,
        dateTo,
      })

}
async function updatedPenalty (penaltyId, cantPenalty, dateTo){
    console.log("ingresando al update Penalty")
    console.log(dateTo)

    if (!dateTo) {
        let dateTo = date.getDateForPenalty()
    }

    
    cantPenalty ++
    return await Penalty.update(
      {
        cantPenalty: cantPenalty,
        dateTo: dateTo
      },
      {
        where: {
          id: penaltyId
        }
      }
)};





module.exports = {
    getById, 
    getAll,
    generarPenalidad,
    getPenaltyByIdUser,
    updatedPenalty,
}