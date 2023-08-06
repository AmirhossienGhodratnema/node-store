const router = require('express').Router();
const ChatController = require('../../../controller/web/chat/chatController');

// Controller
const NamespaceController = require('./../../../controller/web/chat/namespaceController');

// Validation
const ConversationValidation = require('./../../../validation/web/conversationValidation')

router.post('/add', ConversationValidation.create(), NamespaceController.create);
router.get('/getAll', NamespaceController.getAll);

module.exports = { nameSpace: router }