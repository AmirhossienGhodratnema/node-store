const { check } = require('express-validator');



const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('title require'),

        check('text')
            .notEmpty().withMessage('text require'),

        check('shortText')
            .notEmpty().withMessage('shortText require'),

        check('category')
            .notEmpty().withMessage('category require - Array'),

        check('tag')
            .notEmpty().withMessage('tag require - Array'),

        check('filename')
            .custom(async (value, { req }) => {
                if (!req.body.filename) {
                    console.log('req.body in blogValidation', req.body)
                    throw new Error('image is not define');
                }
            })
    ]
};

const edit = () => {
    return [
        check('title')
            .isLength({ min: 3, max: 11 }).withMessage('Between 3 and 11 characters'),
    ]
};


module.exports = { create, edit };