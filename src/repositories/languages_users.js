const {languages_users} = require('../../db/models')

async function saveFavoriteLanguage(user_id, language_id) {
    return await languages_users.create({user_id, language_id})
  }
  
  async function deleteFavoriteLanguage(uId, lId) {
    return await languages_users.destroy({
      where: {
        user_id: uId,
        language_id: lId
      }
    })
  }
module.exports={
    saveFavoriteLanguage,
    deleteFavoriteLanguage
}