const route = require('express').Router();
const { chatRouters } = require('./chat/chat');
const { nameSpace } = require('./chat/namespace');
const { room } = require('./chat/room');



route.get('/', (req, res, next) => {
    return res.json('Main route web...')
});

route.use('/chat',chatRouters)
route.use('/nameSpace',nameSpace)
route.use('/room',room)


module.exports = { AllRoutesWeb: route };