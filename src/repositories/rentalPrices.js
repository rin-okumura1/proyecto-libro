
const {rentalPrice } = require ('../../db/models')


const getRentalPriceByIdBook = async (id) => {
  
  console.log("entrando al get ... ");
  console.log(id);
  
  return  rentalPrice.findOne({
    where: {
        bookId: id
    }
  })
}

module.exports = {
    getRentalPriceByIdBook,
}