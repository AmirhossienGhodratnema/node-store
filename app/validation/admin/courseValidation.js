const { check } = require('express-validator');




const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('text require'),

        check('shortText')
            .isLength({ min: 3, max: 20 }).withMessage('Between 3 and 20 characters'),

        check('shortDescription')
            .isLength({ min: 3, max: 40 }).withMessage('Between 3 and 40 characters'),

        check('description')
            .notEmpty().withMessage('description require'),

        check('filename')
            .custom(async (value, { req }) => {
                if (!req.body.filename) {
                    throw new Error('image is not define');
                }
            }),

        check('tags')
            .notEmpty().withMessage('tags require - typeOf Array'),

        check('category')
            .notEmpty().withMessage('category require - typeOf Array'),

        check('type')
            .notEmpty().withMessage('type require'),

        check('price')
            .notEmpty().withMessage('price require')
            .isNumeric().withMessage('price require - typeOf number'),

        check('status')
            .notEmpty().withMessage('status require'),

        check('teacher')
            .notEmpty().withMessage('teacher require'),
    ]
};

const edit = () => {
    return [
        check('title')
            .notEmpty().withMessage('text require'),

        check('shortText')
            .isLength({ min: 3, max: 20 }).withMessage('Between 3 and 20 characters'),

        check('shortDescription')
            .isLength({ min: 3, max: 40 }).withMessage('Between 3 and 40 characters'),

        check('description')
            .notEmpty().withMessage('description require'),

        check('filename')
            .custom(async (value, { req }) => {
                if (!req.body.filename) {
                    throw new Error('image is not define');
                }
            }),

        check('tags')
            .notEmpty().withMessage('tags require - typeOf Array'),

        check('category')
            .notEmpty().withMessage('category require - typeOf Array'),

        check('type')
            .notEmpty().withMessage('type require'),

        check('price')
            .notEmpty().withMessage('price require')
            .isNumeric().withMessage('price require - typeOf number'),

        check('status')
            .notEmpty().withMessage('status require'),


    ]
};


const chapter = () => {
    return [
        check('title')
            .notEmpty().withMessage('text require'),

        check('description')
            .notEmpty().withMessage('description require'),

    ]
};




module.exports = { create, chapter, edit };