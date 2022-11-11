const { language } = require('../../db/models');

const getLanguageById = async (id) => {
    return await language.findByPk(id);
};

module.exports = {
    getLanguageById
}