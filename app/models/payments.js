const mongoose = require('mongoose');

const Schema = new mongoose.Schema({

});


module.exports = {
    Payment: mongoose.model('Payment', Schema)
}