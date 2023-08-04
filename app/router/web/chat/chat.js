const router = require('express').Router();
const ChatController = require('../../../controller/web/chat/chatController');


router.get('/', ChatController.index)

module.exports = { chatRouters: router }