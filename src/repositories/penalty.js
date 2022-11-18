const {
  Penalty,
  Users
} = require('../../db/models')
var userRep = require('./users')

var date = require('./date')
const DISABLE = 1;
const MAX_PENALTY = 10;


const getAll = async (params = {}) => {
  let query = {
    where: {},
    attributes: {
      exclude: ['id']
    },
    include: [{
      model: Users,
      attributes: ['id', 'name', 'surname', 'email']
    }]
  }
  return await Penalty.findAll(query);
};
async function getPenaltyByIdUser(uID) {
  return await Penalty.findOne({
    where: {
      userId: uID
    }
  })
}

const getById = async (paramsId) => {
  return await Penalty.findOne({
    where: {
      id: paramsId
    }
  })
}

/*async function generarPenalidad(userId) {
  // usuario  no tiene registro de sanciones --> se crea nuevo registro [X]
  // existiendo.. si tiene cantidad penalidades entonces:
  //  1.si tiene fecha vencida --> update (id, cant, fecha)
  //  2.si tiene fecha vigente  --> sumarFechaSancionVigente(id, cant,fecha)
  console.log(userId);

  let penalty = await getPenaltyByIdUser(userId)
  let dateNow = await date.getDateNow()
  console.log(penalty);

 
  if (!penalty) { // si no existe registro de sanciones
    
    return await createPenalty(userId)
  }

  if (penalty) {
    

    let dateToPenalty = date.setFormatDateToExpect(penalty.dateTo)
    if (penalty.cantPenalty < MAX_PENALTY) { // si la penalidad es menor a 10
      
      if (dateToPenalty <= dateNow) { // fecha vencida 
        
        await updatedPenalty(penalty.id, penalty.cantPenalty)
      } else { // fecha vigente
        console.log("en la fecha vigente");
        dateToPenalty = date.updateDateForPenalty(penalty.dateTo) // actualiza el dateTo
        await updatedPenalty(penalty.id, penalty.cantPenalty, dateToPenalty)
      }
    } else { // si la penalidad es mayor a 10 se cambia el status del usuario
      let user = await userRep.getById(userId)
      userRep.changeStatus(user.id, DISABLE)
    }
  }

}*/



function getDatePenalty(penalty) {
  return date.setFormatDateToExpect(penalty.dateTo)
}

async function generarPenalidad(userId) {
  let penalty = await getPenaltyByIdUser(userId)
  if (!penalty) {
      return await createPenalty(userId)
  }
  if (penalty.cantPenalty < MAX_PENALTY) {
      return await penaltyForExpired(penalty)
  }
  return await disableUser(userId)
}

async function updatePenaltyDate(penalty) {
  
  const dateToPenalty = date.updateDateForPenalty(penalty.dateTo) // actualiza el dateTo
  
  return await updatedPenalty(penalty.id, penalty.cantPenalty, dateToPenalty)
}

async function penaltyForExpired(penalty) {
  let dateNow = await date.getDateNow()
  let dateToPenalty = getDatePenalty(penalty)
  if (dateToPenalty <= dateNow) { // fecha vencida 
      return await updatedPenalty(penalty.id, penalty.cantPenalty)
  }
  return updatePenaltyDate(penalty)
}

async function disableUser(user) {
  await userRep.getById(userId)
  userRep.changeStatus(user.id, DISABLE)

}
async function createPenalty(userId) {

  let dateTo = date.getDateForPenalty()
  return await Penalty.create({
    userId,
    dateTo,
  })

}
async function updatedPenalty(penaltyId, cantPenalty, dateTo) {
  
  if (!dateTo) {
    dateTo = date.getDateForPenalty()
  }
  cantPenalty++

  return await Penalty.update(

    {

      cantPenalty: cantPenalty,
      dateTo: dateTo
    }, {
      where: {
        id: penaltyId
      }
    }
  )
};





module.exports = {
  getById,
  getAll,
  generarPenalidad,
  updatedPenalty,
  getPenaltyByIdUser,
}