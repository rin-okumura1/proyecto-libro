var express = require('express'); 
var router = express.Router(); 
var Rental = require('../src/repositories/rental')
var users = require('../src/repositories/users')
var books = require('../src/repositories/books')
var date = require('../src/repositories/date');
var penalties = require('../src/repositories/penalty')
const AVAILABLE = 1
const NOTAVAILABLE=2






/* GET home page. */
router.get('/', async function(req, res, next) {
  res.json(await Rental.getAll());
});


//GET POR ID
router.get('/:id', async function(req, res) {
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
dateNow=await date.getDateNow()

  try {
      if(data) {

        if (! await  users.getById(req.body.userId) || !req.body.userId ) {  // si user existe y si userid no esta vacio
          return res.status(400).json({message:"BAD_REQUEST"})
        }

        if (! await  books.getBookById(req.body.bookId) || !req.body.bookId ) { // si book existe y si bookid no esta vacio
          return res.status(400).json({message:"BAD_REQUEST"})
        }

        if ( dateFrom < dateNow || !req.body.dateFrom) {    // si desde que fecha es menor del dia actual
          return res.status(400).json({message:"INVALID_DATE_FROM"})
        }

        if ( (dateToExpect < dateNow && dateToExpect < dateFrom )|| !req.body.dateToExpect) { // si la fecha esperada es menor que la actual y menor que desde
          return res.status(400).json({message:"INVALID_DATE_TO_EXPECT"})
        }

        if ( (! await  users.isEnable(req.body.userId))) { // si user esta disponible
          return res.status(400).json({message:"USER_DON'T_ENABLE"})
        }
        if ( (! await  books.isAvailable(req.body.bookId))) {  // si book esta disponible
          return res.status(400).json({message:"BOOK_DON'T_AVAILABLE"})
        }
        // si usuario no tiene fecha vigente de sancion

        let penalty = await penalties.getPenaltyByIdObj(req.body.userId)
        let datePenalty = date.setFormatDateToExpect(penalty.dateTo)

        if (datePenalty > dateNow){
          return res.status(400).json({message:" penalty valid"})
        }

          let saved = await Rental.saveRental(userId, bookId,dateFrom , dateToExpect);

          console.log(saved);
          if (saved){  // si saved da true, hay que pedirle a status que cambie el estado de book
            books.changeAvailability(bookId,NOTAVAILABLE)
          }
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
  let rentalObj = await Rental.getRentalByIdObj(rentalId)
  let userId= rentalObj.userId
  dateNow= await date.getDateNow()
  
  try {
    if(rentalObj) {
      if ( dateToReal != dateNow || !dateToReal) { 
        return res.status(400).json({message:"INVALID_DATE_TO_REAL"})
      }
          
         await Rental.updatedDateToReal(rentalId,dateToReal);
         rentalObj= await Rental.getById(rentalId)
         
         if (rental){// si saved da true, hay que pedirle a status que cambie el estado de book
          console.log("el if del rental para cambiar estado de libro date to real");
          console.log(rental.bookId);
          books.changeAvailability(rental.bookId,AVAILABLE)
         }
        if (update==1){
          dateExpect= date.setFormatDateToExpect(rentalObj.dateToExpect)
          result = date.getDateNow > dateExpect
        if (result ){
          await penalties.generarPenalidad(userId)
        } 
        res.status(201).json(rentalObj);
      }}
}catch(error) {
    res.status(400).json({message: error});
}});



module.exports = router;