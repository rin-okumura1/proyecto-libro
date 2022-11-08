var express = require('express'); 
var router = express.Router(); 
var Rental = require('../src/repositories/rental')
var users = require('../src/repositories/users')
var books = require('../src/repositories/books')
var books = require('../src/repositories/books')
var date = require('../src/repositories/date')
var penalties = require('../src/repositories/penalty')





/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json(await rental.getAll());
});

router.get('/:id', async function(req, res) {
  //res.json(await penalty.getById(req.params.id));
  let alquiler =  await Rental.getById(req.params.id)
    
  if (alquiler){
    return res.json(alquiler)
  }
  res.status(404).end()
  
});

/*POST */
router.post('/', async function (req, res, next) {

let data= req.body;
const { userId, bookId, dateFrom, dateToExpect } = data;
  
dateNow=date.getDateNow()



  try {
      if(data) {

        if (! await  users.getById(req.body.userId) || !req.body.userId ) { 
          return res.status(400).json({message:"is undefined"})
        }

        if (! await  books.getBookById(req.body.bookId) || !req.body.bookId ) { 
          return res.status(400).json({message:"book is undefined"})
        }

        if ( dateFrom < dateNow || !req.body.dateFrom) { 
          return res.status(400).json({message:"bad dateFrom"})
        }

        if ( (dateToExpect < dateNow && dateToExpect < dateFrom )|| !req.body.dateToExpect) { 
          return res.status(400).json({message:"bad dateToExpect"})
        }
          let saved = await Rental.saveRental(userId, bookId,dateFrom , dateToExpect);
          res.status(201).json(saved);
      }
  }catch(error) {
      res.status(400).json({message: error});
  }
});


/*PUT*/
router.put('/:id', async function(req, res) {
  let rentalId =  req.params.id;
  let rental = await Rental.getById(rentalId)
  let dateToReal = req.body.dateToReal
  
    console.log(rental)
  dateNow= await date.getDateNow()
  
  try {
    if(rental) {
      

        console.log("entrando al if de try")
      if ( dateToReal != dateNow || !dateToReal) { 
        return res.status(400).json({message:"bad dateToReal"})
      }
        let update = await Rental.updatedDateToReal(rentalId,dateToReal);
       
        

        /*if (update==1){
          console.log("paso true")
          dateExpect= date.setFormatDateToExpect(rental.dateToExpect)
          console.log("devolvio el dato esperado " + dateExpect)
          result = date.getDateNow > dateExpect
          console.log("devolvio resultado de result " + result)
        if (result ){
          console.log("ingresando para generar penalidad")
        await penalties.generarPenalidad(rental.userId)
        }
      }*/
        rental= await Rental.getById(rentalId)
        //console.log("imprimo user id" )
        res.status(201).json(rental);
    }
}catch(error) {
    res.status(400).json({message: error});
}
});



module.exports = router;