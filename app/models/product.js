const mongoose = require('mongoose');

const Features = new mongoose.Schema({
    lengths: { type: String, defult: '0' },
    height: { type: String, defult: '0' },
    width: { type: String, defult: '0' },
    weight: { type: String, defult: '0' },
    coler: { type: [String], defult: [] },
    model: { type: [String], defult: [] },
    madein: { type: String, defult: '0' },
})

const Schema = new mongoose.Schema({
    title: { type: String, require: true, toLower: true },
    shortText: { type: String, require: true, toLower: true },
    shortDescription: { type: String, require: true, toLower: true },
    description: { type: String, require: true, toLower: true },
    images: { type: [String], require: true },
    tags: { type: [String], defult: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'Category', require: true },
    comments: { type: [], defult: [] },
    likes: { type: [mongoose.Types.ObjectId], defult: [] },
    disLikes: { type: [mongoose.Types.ObjectId], defult: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], defult: [] },
    price: { type: Number, defult: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, require: true },
    delete: { type: Boolean, require: true, default: false },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId,ref:'User', require: true },
    features: { type: Features, default: [] },
}, { toJSON: { virtuals: true } });

Schema.virtual('imageUrl').get(function () {
    return this.images.map(image => `${process.env.BASE_URL}${process.env.SERVER_PORT}/${image}`)
    // return `${process.env.BASE_URL}${process.env.SERVER_PORT}/${this.image}`;
})
Schema.index({ title: 'text', shortText: 'text', shortDescription: 'text', description: 'text' });

Schema.virtual('CommentBlog', { ref: 'Comment', localField: '_id', foreignField: 'productID' });

module.exports = {
    Product: mongoose.model('Product', Schema)
}