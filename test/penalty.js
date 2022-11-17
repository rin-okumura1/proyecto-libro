const { assert, expect } = require('chai')
const request = require('supertest')
const app = require('../app')
var penalties = require('../src/repositories/penalty')
var ren = require('../routes/rental')
var date = require('../src/repositories/date')
const {book, Rental, Users, Penalty } = require("../db/models")
let uIdNow




async function createRental (data) {

    const { userId, bookId, dateFrom, dateToExpect, dateToReal } = data;

        const newdRental =await  Rental.create({
            "userId":userId, 
            "bookId": bookId, 
            "dateFrom": dateFrom,
            "dateToExpect": dateToExpect,
            "dateToReal":dateToReal 
           });
    
           return newdRental
        }

async function createBook(data) {
const { authorId, editionYear, title, categoryId, languageId, synopsis, availabilityId, userId } = data;
    const newdBook =await  book.create({
        "authorId": authorId,
        "editionYear": editionYear,
        "title": title,
        "categoryId": categoryId,
        "languageId": languageId,
        "synopsis": synopsis,
        "availabilityId": availabilityId,
        "userId": userId
       });

       return newdBook
    }

async function createUser(data) {
        const { name, surname, email, password } = data;
            const newdUser =await  Users.create({
                "name": name,
                "surname": surname,
                "email": email,
                "password": password,
               });
        
               return newdUser
            }
async function createPenalty(data) {

        const { userId, cantPenalty, dateTo } = data;
            const newdPenalty =await  Penalty.create({
                "userId": userId,
                "cantPenalty": cantPenalty,
                "dateTo": dateTo
               });
        
               return newdPenalty
            }
async function deleteUser(i) {
    let user = await Users.findOne({
        where: {
            id:i
        }
      })
    await user.destroy();
    return user;
        }

 async function deletePenalty(uId) {
            let penalty = await Penalty.findOne({
                where: {
                    "userId": uId
                }
              })
            await penalty.destroy();
            return penalty ;
                }
 async function deleteBook(i) {
                    let bookDelete = await book.findOne({
                        where: {
                            "id": i
                        }
                      })
                    await bookDelete.destroy();
                    return bookDelete ;
                        }
async function deleteRental(id) {
                            let rental= await Rental.findOne({
                                where: {
                                    "id": id
                                }
                              })
                            await rental.destroy();
                            return rental ;
                                }


                

describe('Penalty', function() {
    let u
    let b
    let r
    

    before(async function ()  {
       
       let dataUser = {
             "name": "Juan",
             "surname": "Perez",
             "email": "juanperez@correo.com",
             "password": "123456"
        }
       u =await   createUser(dataUser)
        

       let dataBook ={
        
        "authorId": 1,
        "editionYear": 2018,
        "title": "Test",
        "categoryId": 1,
        "languageId": 1,
        "synopsis":
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. masa aeneana. Cum sociis natoque penatibus et",
        "availabilityId": 1,
        "userId": u.id
      
      } 
       b= await createBook(dataBook)
       


        let dataRental= {
            "userId": u.id, 
            "bookId": b.id, 
            "dateFrom": "2022-11-09",
            "dateToExpect": "2022-11-10",
            "dateToReal":"2022-11-10" 
        }

        r= await createRental(dataRental)
        
        

        
    })
    describe ('Registrar primera penalidad',async function()
    {
        it('Se requiere crear un registro de penalizacion a usuario',async function(done) {
        // console.log("dentro del primer it");
        //console.log(u);
        //console.log(b);
        //console.log(r);
           let param = r.id;

         //  p  = await penalties.getPenaltyByIdUser(u.id)
                //console.log(p);
        
               /*  request(app)
                .put('/rental/:param')
                .send({
                    "dateToReal":"2022-11-17"
                })
                .expect(201,done())*/
                
            
        

        })

        


    }) // termina primer describe de registrar primera penalidad
    after(async function ()  {
        //await deleteUser(u.id)
        //await deletePenalty(u.id)
        //await deleteBook(b.id)
        //await deleteRental(r.id)
        });
    
}); // termina el describe de penalty general

















