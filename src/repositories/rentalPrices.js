
const {rentalPrice } = require ('../../db/models')


const getRentalPriceByIdBook = async (id) => {
  

  
  return  rentalPrice.findOne({
    where: {
        bookId: id
    }
  })
}

module.exports = {
    getRentalPriceByIdBook,
}