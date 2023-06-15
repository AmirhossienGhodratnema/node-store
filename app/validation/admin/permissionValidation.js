const { check } = require('express-validator');



const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('title require'),

        check('description')
            .notEmpty().withMessage('permissions require - Array'),

    ]
};

const edit = () => {
    return [
        check('title')
            .notEmpty().withMessage('title require'),

        check('description')
            .notEmpty().withMessage('permissions require - Array'),

    ]
};



module.exports = { create, edit };