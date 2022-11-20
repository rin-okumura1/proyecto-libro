const {categories_users} = require('../../db/models')

async function saveFavoriteCategory(user_id, category_id) {
    return await categories_users.create({user_id, category_id})
  }
  
  async function deleteFavoriteCategory(uId, cId) {
    return await categories_users.destroy({
      where: {
        user_id: uId,
        category_id: cId
      }
    })
  }
module.exports={
    saveFavoriteCategory,
    deleteFavoriteCategory
}