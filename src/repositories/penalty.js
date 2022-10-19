const {Penalty, Users} = require ('../../db/models')


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





module.exports = {
    getById, 
    getAll,
}