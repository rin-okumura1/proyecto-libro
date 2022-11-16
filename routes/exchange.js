var express = require('express'); 
var router = express.Router(); 
var dateNow = require('../src/repositories/date');
var exchange = require('../src/repositories/exchange')
var users = require('../src/repositories/users')
var books = require('../src/repositories/books')








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
   
   dateNowExchange = await  dateNow.getDateNow()
 
    try {
        if(data) {

          

         
          if(!bookId1 || !bookId2) {
            throw new Error('BAD_REQUEST')
          }
          
          // validar libro 1
          await dataValidation(bookId1)

          // validar libro 2 
          await dataValidation(bookId2)
          
          if ( await users.isEqualUser(bookId1,bookId2)){
            throw new Error('ERROR_SAME_USERS')
          }
          

        
            let saved = await exchange.saveExchange(bookId1, bookId2, dateNowExchange);

            if (saved){  // 
              
              // intercambiar los usariosid de los libros
              await books.exchangesUserAndBooks(bookId1, bookId2)
            }
            res.status(201).json(saved);
        }
    }catch(error) {
        res.status(400).json({message: error.message});
    }
  });

  async function dataValidation (bookId) {
    
    let bookFound =  await  books.getBookById(bookId)
    
    if ( ! bookFound ) {  // si existe libro 
      throw new Error("BOOK_IS_UNDEFINED")
    }

    if ( (! await  books.isAvailable(bookFound.id))) {  // si book esta disponible
      throw new Error("BOOK_DON'T_AVAILABLE")
    }
    
    if ( (! await  users.isEnable(bookFound.userId))) { // si esta habilitado los usuario que intercambian
      throw new Error("USER_DON'T_ENABLE")
    }
    
    
  
};



    
module.exports = router;