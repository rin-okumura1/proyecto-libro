var express = require('express');
const { route } = require('.');
var router = express.Router();
var repositories = require("../src/repositories/users")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let retorno = await repositories.getAll({
    statusId: req.query.statusId
  })


  if (retorno.length == 0) {
    res.status(404).end()
  }


  res.json(retorno);
});



router.get('/:id', async function (req, res, next) {
  let user = await repositories.getById(req.params.id)
  if (user != null) return res.json(user);

  else res.status(404).end();
});

router.post('/', async function (req, res, next) {

  if (!req.body.name || req.body.name.length<1 ) { 
    res.status(400).json({message:"is unde fined"})
  }
  if(!req.body.surname || req.body.surname.length<1){
    res.status(400).json({message:"surname is undefined or too weak"})
  }
  if(!req.body.password || req.body.password.length<1){
    res.status(400).json({message:"password is undefined or too weak"})
  }
  if(!req.body.score || req.body.score.length<1){
    res.status(400).json({message:"score is too low"})
  }

  let a=await repositories.saveUser(req.body)
     
  res.json(a);
});

module.exports = router;