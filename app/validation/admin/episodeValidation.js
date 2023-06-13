const { check } = require('express-validator');



//     chapter: { type: mongoose.Types.ObjectId, require: true },
//     course: { type: mongoose.Types.ObjectId, require: true },

const create = () => {
    return [
        check('title')
            .notEmpty().withMessage('text require'),

        check('description')
            .notEmpty().withMessage('description require'),

        check('type')
            .notEmpty().withMessage('type require'),

        check('chapter')
            .notEmpty().withMessage('chapter require'),

        check('course')
            .notEmpty().withMessage('course require'),
    ]
};




module.exports = { create };