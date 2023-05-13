const { check } = require('express-validator');
const { Categorys } = require('./../../models/categorys');



const create = () => {
    return [
        check('title')
            .isLength({ min: 3, max: 11 }).withMessage('Between 3 and 11 characters'),
    ]
};

module.exports = { create };