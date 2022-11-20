var express = require('express'); 
var router = express.Router(); 
var Rental = require('../src/repositories/rental')
var users = require('../src/repositories/users')
var books = require('../src/repositories/books')
var date = require('../src/repositories/date');

var penalties = require('../src/repositories/penalty')
var rentalPrice = require('../src/repositories/rentalPrices')


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
        
        if( (! await rentalPrice.getRentalPriceByIdBook(req.body.bookId))) { // si book es rentable
          return res.status(400).json({message:"BOOK_IS_NOT_A_RENT"})
        }
        
       
        // si usuario  tiene fecha vigente de sancion

        let penalty = await penalties.getById(req.body.userId)
        if (penalty){
          let datePenalty = date.setFormatDateToExpect(penalty.dateTo)
          if (datePenalty > dateNow){
            return res.status(400).json({message:"PENALTY_VALID"})
          }
        }
        
            
          let saved = await Rental.saveRental(userId, bookId,dateFrom , dateToExpect);
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

  let rental = await Rental.getById(req.params.id)
  let dateToReal = req.body.dateToReal  
  let userId= rental.userId
  dateNow= await date.getDateNow()
  
  try {
    if(rental) {
        
      if ( dateToReal != dateNow || !dateToReal) {  // que el dia ingrasado coincida con el dia actual
        return res.status(400).json({message:"INVALID_DATE_TO_REAL"})
      }
         await Rental.updatedDateToReal(rental.id,dateToReal);
         rental= await Rental.getById(rental.id) // se busca el rental actualizado
         
         if (rental){//  cambie el estado de book
          books.changeAvailability(rental.bookId,AVAILABLE)  // paso a disponible
          dateExpect= date.setFormatDateToExpect(rental.dateToExpect)
          result = await date.getDateNow() > dateExpect
        if (result ){
          await penalties.generarPenalidad(userId)
        } 
        res.status(201).json(rental);
      }}
}catch(error) {
    res.status(400).json({message: error});
}});



module.exports = router;