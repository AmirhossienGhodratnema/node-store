const route = require('express').Router();
const LoginController = require('../../controller/web/chat/loginController');
const { checkLoginForChat, checkAccessLoing } = require('../../middleware/checkLoginChat');
const { chatRouters } = require('./chat/chat');
const { nameSpace } = require('./chat/namespace');
const { room } = require('./chat/room');



route.get('/', (req, res, next) => {
    return res.json('Main route web...')
});

route.get('/login', LoginController.login)
route.post('/login', LoginController.check)
route.use('/chat', checkLoginForChat, checkAccessLoing, chatRouters)
route.use('/nameSpace', nameSpace)
route.use('/room', room)


module.exports = { AllRoutesWeb: route };