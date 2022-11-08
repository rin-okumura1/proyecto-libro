var express = require('express');
const { route } = require('.');
var router = express.Router();
var users = require("../src/repositories/users")

var regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

async function userValidation(dataNewUser) {
  const { name, surname, email, password } = dataNewUser;

  if (!name || (name.length < 1 || name.length > 100)) { 
    throw new Error('BAD_NAME');
  }
  if(!surname || (surname.length < 1 || surname.length > 100)){
    throw new Error('BAD_SURNAME');
  }
  if(!email || !isValidEmail(email) || users.existEmail(email)){
    throw new Error('BAD_EMAIL');
  }
  if(!password || (password.length < 8 || password.length > 12)){
    throw new Error('BAD_PASSWORD');
  }

};

async function isValidEmail(email) {
  return await regExp.test(email);
};

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let retorno = await users.getAll({
    statusId: req.query.statusId
  })


  if (retorno.length == 0) {
    res.status(404).end()
  }
  res.json(retorno);
});


router.get('/:id', async function (req, res, next) {
  let user = await users.getById(req.params.id)
  if (user) return res.json(user);

  else res.status(404).end();
});

router.post('/', async function (req, res, next) {

  let dataNewUser = req.body;

  try {
    if(!dataNewUser) {
      throw new Error('BAD_REQUEST');
    }

    await userValidation(dataNewUser);

    let newUser = await users.saveUser(dataNewUser)
    res.status(201).json(newUser);

  }catch(error) {
    res.status(400).json({message: error.message});
  }
});

module.exports = router;