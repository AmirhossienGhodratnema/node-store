const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    endpoint: { type: String, require: true },
}, { timestamps: true, toJSON: { virtuals: true } });

Schema.virtual('room', { ref: 'Room', localField: '_id', foreignField: 'nameSpace' });


module.exports = {
    Conversation: mongoose.model('Conversation', Schema)
}