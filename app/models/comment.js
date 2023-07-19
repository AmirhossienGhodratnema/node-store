const mongoose = require('mongoose');


const AswerSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToComment: { type: Boolean, default: false },

}, { timestamps: true })


const Schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToComment: { type: Boolean, default: true },
    parent: { type: [AswerSchema], default: [] },
    blogID: { type: mongoose.Types.ObjectId, ref: 'Blog' },
    productID: { type: mongoose.Types.ObjectId, ref: 'Product' },
}, { timestamps: true })



module.exports = {
    Comment: mongoose.model('Comment', Schema)
}