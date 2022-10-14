const {
  Users,
  Status
} = require("../../db/models")
const {
  param
} = require("../../routes")

async function getAll(params = {}) {
  let query = {
    where: {},
    include: [Status]
  }

  if (params.statusId) {
    query.where = {
      statusId: params.statusId
    }
  }



  return await Users.findAll(query)
}

async function getById(id) {
  return await Users.findByPk(id, {
    include: [Status]
  })
}

async function saveUser() {
  return await Users.create({
    "name": "Aitor",
    "surname": "Tilla",
    "email": "aitorTilla@correo.com",
    "password": 123554,
    "score": 1,
    "statusId": 2,
    createdAt: "2022-01-01 22:58:01",
    updatedAt: "2022-01-01 22:58:01"
  })
}

module.exports = {
  getById,
  getAll,
  saveUser
}