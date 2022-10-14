var express = require('express');
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

router.get("/p", async function (req, res, next) {
  let lol = await repositories.saveUser()
  lol.hecho = 'ok'
  return await res.json(lol)
})

router.get('/:id', async function (req, res, next) {
  let user = await repositories.getById(req.params.id)
  if (user != null) return res.json(user);

  else res.status(404).end();
});
module.exports = router;