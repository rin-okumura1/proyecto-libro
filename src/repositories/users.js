
const { Users,Status }=require("../../db/models")

async function getAll() {
  return await Users.findAll({include:[Status]})
}

async function getById(id) {
  return await Users.findByPk(id)
}

async function saveUser(dataNewUser) {
  let newUser = await Users.create({
    name: dataNewUser.name,
    surname: dataNewUser.surname,
    email: dataNewUser.email,
    password: dataNewUser.password,

  });
  return newUser;
}

async function existEmail(newEmail) {
  let userWithSameEmail = await Users.findOne({
    where: {
      email: newEmail
    }
  });
  return (userWithSameEmail != null);
}

module.exports={
    getById,
    getAll,
    existEmail,
    saveUser,
}