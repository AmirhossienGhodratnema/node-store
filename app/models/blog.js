const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
    image: { type: String, require: true },
    tag: { type: [String], default: [] },
    category: { type: mongoose.Types.ObjectId, require: true },
    comments: { type: [], default: [] },
    like: { type: [mongoose.Types.ObjectId], default: [] },
    disLike: { type: [mongoose.Types.ObjectId], default: [] },
    bookMark: { type: [mongoose.Types.ObjectId], default: [] },
});


module.exports = {
    Blog: mongoose.model('Blog', Schema)
}