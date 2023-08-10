const NameSpaceSocketHandler = require("./nameSpaceSocket")


module.exports = {
    socketHandler: (io) => {
        new NameSpaceSocketHandler(io).initConnection();
    }
}