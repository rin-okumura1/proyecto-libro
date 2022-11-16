var express = require('express');
const { route } = require('.');
var router = express.Router();
var users = require("../src/repositories/users")

var regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

async function basicDataValidate(dataNewUser) {
  const { name, surname, email, password } = dataNewUser;

  if (!name || (name.length < 1 || name.length > 100)) { 
    throw new Error('BAD_NAME');
  }
  if(!surname || (surname.length < 1 || surname.length > 100)){
    throw new Error('BAD_SURNAME');
  }
  if(!password || (password.length < 8 || password.length > 12)){
    throw new Error('BAD_PASSWORD');
  }

};

async function newUserEmailValidate(dataNewUser) {
  const { email } = dataNewUser;

  if(!email || ! await isValidEmail(email) || await users.existEmail(email)){
    throw new Error('BAD_EMAIL');
  }
};

async function nonEditableFieldValidate(dataNewUser) {
  const { email } = dataNewUser;

  if(email){
    throw new Error('EMAIL_FIELD_NOT_EDITABLE');
  }
};

async function isValidEmail(email) {
  return await regExp.test(email);
};

//Se utilizará este endpoint, sólo para verificar la existencia de los usuarios registrados
router.get('/', async function (req, res, next) {
  let retorno = await users.getAll({
    statusId: req.query.statusId
  })

  if (retorno.length == 0) {
    res.status(404).end()
  }
  res.json(retorno);
});

//Endpoint para dar de alta un nuevo usuario
router.post('/', async function (req, res, next) {

  let dataNewUser = req.body;

  try {
    if(!dataNewUser) {
      throw new Error('BAD_REQUEST');
    }
    
    await basicDataValidate(dataNewUser);
    await newUserEmailValidate(dataNewUser);


    let newUser = await users.saveUser(dataNewUser);
    res.status(201).json(newUser);

  }catch(error) {
    res.status(400).json({message: error.message});
  }
});

//Endpoint para modificar datos del usuario
router.put('/:id', async function (req, res, next) {

  let userId = req.params.id;
  let newDataUser = req.body;
  let theUser = await users.getById(userId);

  try {
    if(!theUser || !newDataUser) {
      throw new Error('BAD_REQUEST');
    }
    
    await basicDataValidate(newDataUser);
    await nonEditableFieldValidate(newDataUser);


    let updatedUser = await users.updateUser(userId, newDataUser);
    res.status(201).json(updatedUser);

  }catch(error) {
    res.status(400).json({message: error.message});
  }
});



module.exports = router;