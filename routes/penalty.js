var express = require('express'); 
var router = express.Router(); 
var penalty = require('../src/repositories/penalty')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json(await penalty.getAll());
});

router.get('/:id', async function(req, res) {
  //res.json(await penalty.getById(req.params.id));
  let penalidad =  await penalty.getById(req.params.id)
    
  if (penalidad){
    return res.json(penalidad)
  }
  res.status(404).end()
  
});
module.exports = router;