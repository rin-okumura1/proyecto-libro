var express = require('express'); 
var router = express.Router(); 
var rental = require('../src/repositories/rental')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json(await rental.getAll());
});

router.get('/:id', async function(req, res) {
  //res.json(await penalty.getById(req.params.id));
  let alquiler =  await rental.getById(req.params.id)
    
  if (alquiler){
    return res.json(alquiler)
  }
  res.status(404).end()
  
});
module.exports = router;