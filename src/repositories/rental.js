const { Rental, book, Users, category } = require("../../db/models");
const { Op } = require("sequelize");

// Obtiene un registro de libro alquilado
async function getById(id) {
  return await Rental.findByPk(id, {
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
  });
}

// Obtiene todos los registros de libros alquilados
async function getAll(params = {}) {
  // Trae todos los registros de Rentals sin filtro
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

  // Trae todos los registros de Rentals filtrados por el ID de categoria del Libro: http://localhost:3000/rental?categoryId=4
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

module.exports = {
  getById,
  getAll,
};