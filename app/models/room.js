const mongoose = require('mongoose');

const Messages = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref:'User'},
    message: { type: String },
}, { timestamps: true, toJSON: { virtuals: true } });



const Rooms = new mongoose.Schema({
    nameSpace: {title: mongoose.Types.ObjectId, ref: 'Conversation'},
    name: { type: String },
    descrioption: { type: String },
    image: { type: String },
    messages: { type: [Messages], default: [] },
}, { timestamps: true, toJSON: { virtuals: true } });



module.exports = {
    Rooms: mongoose.model('Rooms', Schema)
}