const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToComment: { type: Boolean, default: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Comment', default: undefined },
    blogID: { type: mongoose.Types.ObjectId, ref: 'Comment' },
}, { toJSON: { virtuals: true } });


module.exports = {
    Comment: mongoose.model('Comment', Schema)
}