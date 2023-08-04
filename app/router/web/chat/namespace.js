const router = require('express').Router();
const ChatController = require('../../../controller/web/chat/chatController');

const NamespaceController = require('./../../../controller/web/chat/namespaceController');

router.post('/add', NamespaceController.create);
router.get('/getAll', NamespaceController.getAll);

module.exports = { nameSpace: router }