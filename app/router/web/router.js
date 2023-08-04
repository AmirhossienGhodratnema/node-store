const route = require('express').Router();
const { chatRouters } = require('./chat/chat');
const { nameSpace } = require('./chat/namespace');



route.get('/', (req, res, next) => {
    return res.json('Main route web...')
});

route.use('/chat',chatRouters)
route.use('/nameSpace',nameSpace)


module.exports = { AllRoutesWeb: route };