const {Exchange,book, sequelize} = require ('../../db/models')


const getById = async (id) => {
    return await Exchange.findByPk(id,{
        attributes: { exclude: ["id"] },
      include: [
        {
          model: book,
          as: "Book1",
          attributes: ["id", "title"],
        },
        {
          model: book,
          as: "Book2",
          attributes: ["id", "title"],
        },
      ]
        
    })
}

const getAll = async (params = {}) => {
    let query = {
      where: {},
      attributes: { exclude: ["id"] },
      include: [
        {
          model: book,
          as: "Book1",
          attributes: ["id", "title"],
        },
        {
          model: book,
          as: "Book2",
          attributes: ["id", "title"],
        },
      ],
    };
    return await Exchange.findAll(query);
  };

  async function saveExchange( bookId1,bookId2, date) {
    return await Exchange.create({
      
      bookId1,
      bookId2,
       date
    })
  }
  
 

module.exports = {
    getById, 
    getAll,
    saveExchange
}