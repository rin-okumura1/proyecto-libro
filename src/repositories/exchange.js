const {Exchange,book} = require ('../../db/models')

const getById = async (id) => {
    return await Exchange.findByPk(id,{
        attributes: { exclude: ['id']},
        include: [ 
            {
                model:book,
                attributes: ['id','title']
            }

        ]
        
    })
}

const getAll = async (params = {}) => {
    let query ={
where:{

},
attributes: { exclude: ['id']},
include: [ 
    {
        model:book,
        attributes: ['id','title']
    }

]

    }
    return await Exchange.findAll(query);
}
module.exports = {
    getById, 
    getAll,
}