const { check } = require('express-validator');



const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('title require'),

        check('description')
            .notEmpty().withMessage('description require'),


    ]
};



module.exports = { create };