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
    // usuario  no tiene registro de sanciones --> se crea nuevo registro [X]
    // existiendo.. si tiene cantidad penalidades entonces:
    //  1.si tiene fecha vencida --> update (id, cant, fecha)
    //  2.si tiene fecha vigente  --> sumarFechaSancionVigente(id, cant,fecha)
   let penalty = await getPenaltyByIdObj(userId)
   let dateNow = await date.getDateNow()
   let dateToPenalty = await date.setFormatDateToExpect(penalty.dateTo)
    
    if (!penalty){  // si no existe registro de sanciones
        penalty=createPenalty(userId)
    } 
    if (penalty.cantPenalty<10){  // si la penalidad es menor a 10
        if (dateToPenalty <= dateNow){ // fecha vencida 
            updatedPenalty(penalty.id, penalty.cantPenalty)
       } else {  // fecha vigente
        dateToPenalty= date.updateDateForPenalty (penalty.dateTo)  // actualiza el dateTo
        updatedPenalty(penalty.id, penalty.cantPenalty, dateToPenalty )
       }
    } else {    // si la penalidad es mayor a 10 se cambia el status del usuario
        console.log("si es mayor a 10 cantpenalty");
        let userObj = Users.getObjUser(userId)
        console.log(userObjt.id);
        //buscar el status con statusID que tenemos con el usuario
        // modificamos el status de disponible a no disponible.
    }
    
    


    
    
}

function getPenaltyByIdObj(userId){
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
    getPenaltyByIdObj,
    updatedPenalty,
}