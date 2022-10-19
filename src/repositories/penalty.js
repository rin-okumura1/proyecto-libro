const {Penalty, Users,Status} = require ('../../db/models')
const { Op } = require('sequelize')

const getAllBooks = async (params = {}) => {
    let query = {
        where: {},
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
}
};








module.exports = {
    getById, 
    getAll,
}