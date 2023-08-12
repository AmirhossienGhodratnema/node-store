const { Conversation } = require("../../models/conversation");
const { Room } = require("../../models/room");

module.exports = class NameSpaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io
    }


    initConnection() {
        this.#io.on('connection', async (socket) => {
            const nameSpaces = await Conversation.find({}, { title: 1, endpoint: 1 }).populate('room');
            socket.emit('nameSpaceList', nameSpaces);
        });
    };


    async createNameSpaceConnection() {
        const nameSpaces = await Conversation.find({}, { endpoint: 1 }).populate('room');
        for (const nameSpace of nameSpaces) {
            this.#io.of(`/${nameSpace.endpoint}`).on('connection', async (socket) => {
                socket.emit('roomList', nameSpace.room);
                socket.on('joinRoom', async roomName => {
                    const lastRoom = Array.from(socket.rooms)[1];
                    if (lastRoom) socket.leave(lastRoom);
                    socket.join(roomName);
                    await this.getOnlineUser(nameSpace.endpoint, roomName);
                    const roomInfo = nameSpace.room.find(item => item.name == roomName);
                    socket.emit('roomInfo', roomInfo);
                    await this.getNewMessage(socket);
                    socket.on('disconnect', async () => {
                        await this.getOnlineUser(nameSpace.endpoint, roomName);
                    });
                });
            });
        };
    };


    async getOnlineUser(endpoint, roomName) {
        const onlineUser = await this.#io.of(`${endpoint}`).in(`${roomName}`).allSockets();
        this.#io.of(`${endpoint}`).in(`${roomName}`).emit('onlineUser', Array.from(onlineUser).length);
    };


    async getNewMessage(socket) {
        socket.on('newMessage', async data => {
            const { message, endpoint, roomName } = data;
            await Room.updateOne({ name: roomName }, {
                $push: {
                    messages: {
                        sender: '648ad6278ee79051cb959061',
                        message
                    }
                }
            });
        });
    };
}