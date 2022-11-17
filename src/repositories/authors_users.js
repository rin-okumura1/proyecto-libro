const {authors_users} = require('../../db/models')

async function saveFavoriteAuthor(user_id, author_id) {
    return await authors_users.create({user_id, author_id})
  }
  
  async function deleteFavoriteAuthor(uId, aId) {
    return await authors_users.destroy({
      where: {
        user_id: uId,
        author_id: aId
      }
    })
  }
module.exports={
   saveFavoriteAuthor,
   deleteFavoriteAuthor
}