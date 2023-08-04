const mongoose = require('mongoose');

const Messages = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref:'User'},
    message: { type: String },
}, { timestamps: true, toJSON: { virtuals: true } });



const Schema = new mongoose.Schema({
    nameSpace: {type: mongoose.Types.ObjectId, ref: 'Conversation'},
    name: { type: String },
    description: { type: String },
    image: { type: String },
    messages: { type: [Messages], default: [] },
}, { timestamps: true, toJSON: { virtuals: true } });



module.exports = {
    Room: mongoose.model('Room', Schema)
}