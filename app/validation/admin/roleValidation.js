const { check } = require('express-validator');



const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('title require'),

        check('permissions')
            .notEmpty().withMessage('permissions require - Array'),

    ]
};



module.exports = { create };