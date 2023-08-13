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
                await this.getNewMessage(socket);
                socket.emit('roomList', nameSpace.room);
                socket.on('joinRoom', async roomName => {
                    const lastRoom = await Array.from(socket.rooms)[1];
                    if (lastRoom) {
                        socket.leave(lastRoom);
                    }
                    await socket.join(roomName);
                    await this.getOnlineUser(nameSpace.endpoint, roomName);
                    const roomInfo = await nameSpace.room.find(item => item.name == roomName);
                    await socket.emit('roomInfo', roomInfo);
                    await socket.on('disconnect', async () => {
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
            const { message, roomName, sender, endpoint } = data;
            console.log('data', data);
            await Room.updateOne({ name: roomName }, {
                $push: {
                    messages: {
                        sender,
                        message
                    }
                }
            });
            this.#io.of(`${endpoint}`).in(`${roomName}`).emit('getMessage', data)
        });
    };
}