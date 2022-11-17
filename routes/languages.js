var express = require("express");
var router = express.Router();

const languages = require('../src/repositories/languages')

router.get('/', async function (req, res, next) {

    try {
        return await languages.getAll().then((data) => {
            res.json(data)
        })

    } catch (error) {
        console.log("error going to DB: " + error)
        res.status(500)
    }
    res.status(400).json({ message: 'error reading languages' })
});

module.exports = router;
