const { check } = require('express-validator');
const {Category} = require('./../../models/categorys');

const create = () => {
    return [
        check('title')
            .isLength({ min: 3, max: 11 }).withMessage('Between 3 and 11 characters')
            .custom(async (value, { req }) => {
                const category = await Category.findOne({ title : value });
                if (category) throw new Error('The category is duplicated');
            })
    ]
};

module.exports = { create };