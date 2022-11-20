const { language } = require('../../db/models');

const getLanguageById = async (id) => {
    return await language.findByPk(id);
};


const existingLanguage = async (name) => {
    return await language.findOne(
        { where: { language: name } }
    )
};

const getAll = async () => {
    return await language.findAll({
    })
};

module.exports = {
    getLanguageById,
    existingLanguage,
    getAll
}