const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Product' },
    count: { type: Number, default: 1 }
})

const courseSchema = new mongoose.Schema({
    course: { type: mongoose.Types.ObjectId, ref: 'Course' },
    count: { type: Number, default: 1 }
})

const Schema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    product: { type: [productSchema], default: [] },
    course: { type: [courseSchema], default: [] }
}, { timestamps: true, toJSON: { virtuals: true } });


module.exports = {
    Basket: mongoose.model('Basket', Schema)
}