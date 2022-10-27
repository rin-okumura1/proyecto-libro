const {Users,Status} = require("../../db/models")

const {
  param
} = require("../../routes")


async function exists(email) {
return await Users.findOne({
where:{email}
})

}

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

async function saveUser(data) {
  return await Users.create({
    "name": data.name,
    "surname": data.surname,
    "email": data.email,
    "password": data.password,
    "score": data.score,
    "statusId": 2
  })
}

module.exports = {
  getById,
  getAll,
  saveUser,
  exists
}