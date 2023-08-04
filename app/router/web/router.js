const { chatRouters } = require('./chat/chat');

const route = require('express').Router();



route.get('/', (req, res, next) => {
    return res.json('Main route web...')
});

route.use('/chat',chatRouters)


module.exports = { AllRoutesWeb: route };