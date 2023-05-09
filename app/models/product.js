const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: [String], require: true },
    tags: { type: [String], defult: [] },
    category: { type: mongoose.Types.ObjectId, require: true },
    comments: { type: [], defult: [] },
    like: { type: [mongoose.Types.ObjectId], defult: [] },
    disLike: { type: [mongoose.Types.ObjectId], defult: [] },
    bookMark: { type: [mongoose.Types.ObjectId], defult: [] },
    price: { type: Number, defult: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number },
    type: { type: String, require: true },
    time: { type: String },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, require: true },
    features: {
        type: Object, default: {
            length: '',
            height: '',
            width: '',
            weight: '',
            coler: [],
            model: [],
            madein: ''
        }
    },
});


module.exports = {
    Product: mongoose.model('Product', Schema)
}