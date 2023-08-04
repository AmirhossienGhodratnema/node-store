const router = require('express').Router();
const ChatController = require('../../../controller/web/chat/chatController');
const { uploadFile } = require('../../../utils/upload');

const RoomController = require('./../../../controller/web/chat/roomController');

router.post('/add', uploadFile.single('image'), RoomController.create);
router.get('/getAll', RoomController.getAll);

module.exports = { room: router }