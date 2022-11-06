const { category } = require('../../db/models');

const getCategoryById = async (id) => {
    return await category.findByPk(id);
};

module.exports = {
    getCategoryById
}