const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    invoiceNumber: { type: String },
    basket: { type: Object, default: {} },
    verify: { type: Boolean, default: false },
    authority: { type: String },
    amount: { type: Number },
    description: { type: String, default: 'for shopping' },
    refId: { type: String, default: undefined },
    cardHash: { type: String, default: undefined },
}, { timestamps: true });


module.exports = {
    Payment: mongoose.model('Payment', Schema)
}