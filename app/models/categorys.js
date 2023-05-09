const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title : {type : String , require : true}
});


module.exports = {
    Category: mongoose.model('Category', Schema)
}