const socketIO = require('socket.io');

function initialSocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: '*'
        }
    });
}

module.exports = {
    initialSocket
};