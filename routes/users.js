var express = require('express');
var router = express.Router();
var repositories=require("../src/repositories/users")

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let retorno=await repositories.getAll()
  
  res.json(retorno);
});

router.get('/:id',async function(req, res, next) {
  let user=await repositories.getById(req.params.id)
  
    return res.json(user);
 
});
module.exports = router;
