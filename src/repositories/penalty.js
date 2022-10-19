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
};

const getById = async (id) => {
    return await book.findByPk(id, {
        
        attributes: { exclude: ['id'] },
        include: [
            { 
                model: Users ,
                attributes: ['id', 'name', 'surname', 'email'],
                include: {
                    model: Status,
                    attributes: ['id', 'state']
                }
            }
        ]
})
};





module.exports = {
    getById, 
    getAll,
}