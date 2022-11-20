
var books = require('./books')
const ENABLE = 2;
const { Users, Status, category, language, author } = require("../../db/models");

async function getAll() {
  return await Users.findAll({ include: [Status] })
}

async function getById(userId) {
  
  return await Users.findOne({
    where: {
      id:userId
    }
  });
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

async function updateUser(userId, newDataUser) {
  await Users.update({
    name: newDataUser.name,
    surname: newDataUser.surname,
    password: newDataUser.password,

  },
    {
      where: {
        id: userId
      }
    });
  return await Users.findOne({
    where: {
      id: userId
    }
  });
};

async function existEmail(newEmail) {
  let userWithSameEmail = await Users.findOne({
    where: {
      email: newEmail
    }
  });
  return (userWithSameEmail != null);
}

const isEnable = async (userId) => {
  let userFound = await Users.findByPk(userId);
  const {statusId} = userFound;
  return await statusId == ENABLE;
}

const changeStatus = async (userId, statusId) =>{
  
  let userFound = await getById(userId)


    if(userFound) {
        return await Users.update({
            statusId:statusId
        },
        {
            where: {
                id:userFound.id
            }
        })
    };
}

const isEqualUser = async (bookId1,bookId2) => {
  bookOne= await books.getBookById(bookId1)
  bookTwo= await books.getBookById(bookId2)
  
  return  bookOne.userId == bookTwo.userId;
}

async function getByIdWithAuthors(userId) {
  
    return await Users.findByPk(userId, 
    
      ({
        include:{model: author,  as: "authors"}
      })
  
      )
}
async function getByIdWithLanguages(userId) {
  return await Users.findByPk(userId, 
    
    ({
     
      include:{model: language,  as: "languages"}
    })

    )
}
async function getByIdWithCategories(userId) {
  return await Users.findByPk(userId, 
    
    ({
     
      include:{model: category,  as: "categories"}
    })

    )
}

module.exports = {
  getById,
  getAll,
  existEmail,
  saveUser,
  updateUser,
  getByIdWithAuthors,
  getByIdWithLanguages,
  getByIdWithCategories,
  getById,
  isEnable,
  changeStatus,
  isEqualUser,
  
}
