const { check } = require('express-validator');
const { Conversation } = require('../../models/conversation');



const create = () => {
    return [
        check('title')
            .custom(async (value, { req }) => {
                const { title } = req.body;
                const result = await Conversation.findOne({ title });
                if (result) {
                    throw new Error('title is dublidate');
                }
            }),


        check('endpoint')
            .custom(async (value, { req }) => {
                const { endpoint } = req.body;
                const result = await Conversation.findOne({ endpoint })
                if (result) {
                    throw new Error('Endpoint is dublidate');
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