var express = require('express');
var router = express.Router();
var repositories=require("../src/repositories/repusers")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    
		"dni":123456,
		"name": "juan ",
		"surname":"pacheco",
		"email_address" : "lalala@correo.com",
		"password":123554,
		"qualification":5,
		"status2":"active"
  }]);
});

router.get('/:nombre', function(req, res, next) {
  res.json(
    repositories.getById(req.params.nombre)
		);
});
module.exports = router;
