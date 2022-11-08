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
            }
        ]
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
    // si existe usuario en sanciones Crea
    // existiendo.. si tiene cantidad penalidades !0 --> update (id,cant, fecha)
    // existiendo .. si tiene fecha vencida --> update (id, cant, fecha)
    // existiendo .. si tiene fecha vigente  --> sumarFechaSancionVigente(id, cant,fecha)
    console.log("estoy en el metodo generar penalidad")
    console.log("devuelvo " + userId)
    let penalty = findOne({
        
        where: 
            {
                userId: userId
            }
    })
    console.log(penalty)
    if (!penalty){  // si no existe
        penalty=createPenalty(userId)
    }


    
    return await penalty
}


async function createPenalty(userId){
let datePenalty = date.getDateForPenalty()
    return await Penalty.create({
        userId,
        datePenalty,
      })
}





module.exports = {
    getById, 
    getAll,
    generarPenalidad,
}