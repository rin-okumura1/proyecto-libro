const { Rental, book, Users, category } = require("../../db/models");
const { Op } = require("sequelize");


async function getById(RentalId) {
  return await Rental.findOne({
    where: {
      id:RentalId
    }
  });
}


async function getAll(params = {}) {
 
  let query = {
    where: {},
    attributes: {
      exclude: ["bookId", "userId", "UserId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: book,
        attributes: ["id", "title"],
      },
      {
        model: Users,
        attributes: ["id", "name", "surname", "email"],
      },
    ],
  };

  if (params.categoryId) {
    query = {
      attributes: { exclude: ["bookId", "userId", "UserId", "createdAt", "updatedAt"] },
      include: {
        model: book,
        attributes: ["id", "title"],
        where: {
          categoryId: {
            [Op.eq]: params.categoryId,
          },
        },
        include: {
            model: category,
            attributes: ["id", "name"],
        }
      },
    };
  }

  return await Rental.findAll(query);
}

async function saveRental(userId, bookId,dateFrom , dateToExpect) {
  return await Rental.create({
    userId, 
    bookId,
   dateFrom , 
   dateToExpect,
   dateToReal: dateToExpect,
  })
}

async function updatedDateToReal (rentalId,dateToReal){

  return await Rental.update(
    {
      dateToReal: dateToReal
    },
    {
      where: {
        id: rentalId
      }
    }
  )
}



module.exports = {
  getById,
  getAll,
  saveRental,
  updatedDateToReal
};