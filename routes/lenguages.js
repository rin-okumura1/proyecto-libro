var express = require('express');
var router = express.Router();
var Terminals = require('../src/repositories/lenguages')


router.get('/', async function(req, res, next){
    res.json(await lenguages.getAll())
});

module.exports=router;