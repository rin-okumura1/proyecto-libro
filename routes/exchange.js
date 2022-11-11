var express = require('express'); 
var router = express.Router(); 
var exchange = require('../src/repositories/exchange')
var books = require('../src/repositories/books')
var dateNow = require('../src/repositories/date');






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


/*POST */
router.post('/', async function (req, res, next) {

  let data= req.body;
  const { bookId1, bookId2 } = data;
    console.log(data)
  
   dateNowExchange =  dateNow.getDate()
 console.log(dateNowExchange)
  
    try {
        if(data) {
          console.log("entrando al data" + data)
          // BOOK ID EXISTA
          if (! await  books.getBookById(req.body.bookId1) || !req.body.bookId1 ) { 
            return res.status(400).json({message:"book1 is undefined"})
          }
  
          if (! await  books.getBookById(req.body.bookId2) || !req.body.bookId2 ) { 
            return res.status(400).json({message:"book2 is undefined"})
          }
          console.log("pase los if")

        
            let saved = await exchange.saveExchange(bookId1, bookId2, dateNowExchange);
          
            res.status(201).json(saved);
        }
    }catch(error) {
        res.status(400).json({message: error});
    }
  });
module.exports = router;