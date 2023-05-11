const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, require: true, lowercase: true },
    phone: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
        type: Object, default: {
            code: 0,
            expireIn: 0
        }
    },
    bills: { type: [], default: [] },
    disCount: { type: Number, default: 0 },
    birthday: { type: String },
    rols: { type: [], defult: ['USER'] },
});


module.exports = {
    User: mongoose.model('User', Schema)
}