const mongoose = require('mongoose');

const Features = new mongoose.Schema({
    length: { type: String, defult: '0' },
    height: { type: String, defult: '0' },
    width: { type: String, defult: '0' },
    weight: { type: String, defult: '0' },
    coler: { type: [String], defult: [] },
    model: { type: [String], defult: [] },
    madein: { type: String, defult: '0' },
})

const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    shortText: { type: String, require: true },
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    images: { type: [String], require: true },
    tags: { type: [String], defult: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'category', require: true },
    comments: { type: [], defult: [] },
    likes: { type: [mongoose.Types.ObjectId], defult: [] },
    disLikes: { type: [mongoose.Types.ObjectId], defult: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], defult: [] },
    price: { type: Number, defult: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, require: true },
    format: { type: String },
    supplier: { type: mongoose.Types.ObjectId, require: true },
    features: { type: [Features], default: [] },
});


module.exports = {
    Product: mongoose.model('Product', Schema)
}