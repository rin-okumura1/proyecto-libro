var express = require('express');
var router = express.Router();
var Terminals = require('../src/repositories/categories')

router.get('/', async function(req, res, next){
    res.json(await categories.getAll())
});

module.exports=router;