const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    endpoint: { type: String, require: true },
}, { timestamps: true, toJSON: { virtuals: true } });


module.exports = {
    Conversation: mongoose.model('Conversation', Schema)
}