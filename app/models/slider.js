const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: { type: String },
    text: { type: String },
    type: { type: String, defult : 'main' },
    image: { type: String, require: true },
});


module.exports = {
    Slider: mongoose.model('Slider', Schema)
}