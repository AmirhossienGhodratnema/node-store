const { Conversation } = require("../../models/conversation");

module.exports = class NameSpaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on('connection', async (socket) => {
            const nameSpace = await Conversation.find({}, { title: 1, endpoint: 1 }).sort({ createdAt : 1 }).populate('room');
            socket.emit('nameSpaceList', nameSpace);
        });
    };

    async createNameSpaceConnection() {
        const nameSpaces = await Conversation.find({}, { title: 1, endpoint: 1 }).sort({ createdAt : 1}).populate('room');
        for (const nameSpace of nameSpaces) {
            await this.#io.of(`/${nameSpace.endpoint}`).on('connection', async (socket) => {
                const conversation = await Conversation.findOne({endpoint: nameSpace.endpoint}, { room:1 }).sort({ createdAt : 1}).populate('room');
                await socket.emit('roomList', conversation.room)
            })
        }
    };
};