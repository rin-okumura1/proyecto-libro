var express = require('express');
var router = express.Router();
var author = require('../src/repositories/authors')

router.get('/', async function(req, res, next){
    res.json(await authors.getAll())
});

module.exports=router;