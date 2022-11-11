var express = require('express'); 
var router = express.Router(); 
var exchange = require('../src/repositories/exchange')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json(await exchange.getAll());
});

router.get('/:id', async function(req, res) {
  //res.json(await penalty.getById(req.params.id));
  let intercambio =  await exchange.getById(req.params.id)
    
  if (intercambio){
    return res.json(intercambio)
  }
  res.status(404).end()
  
});
module.exports = router;