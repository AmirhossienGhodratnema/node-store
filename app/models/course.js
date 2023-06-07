const mongoose = require('mongoose');

const Episodes = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, defult: 'free' },
    time: { type: String, defult: '00:00' },
});

const Chapter = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, defult: '' },
    episodes: { type: [Episodes], defult: '' },

});

const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    short_text: { type: String, require: true },
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    tags: { type: [String], defult: [] },
    category: { type: mongoose.Types.ObjectId, ref: 'category', require: true },
    comments: { type: [], defult: [] },
    likes: { type: [mongoose.Types.ObjectId], defult: [] },
    disLikes: { type: [mongoose.Types.ObjectId], defult: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], defult: [] },
    price: { type: Number, defult: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, defult: 'free', require: true },
    time: { type: String, defult: '00:00' },
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'user', require: true },
    chapter: { type: [Chapter], defult: [] },
    students: { type: [mongoose.Types.ObjectId], ref: 'user', defult: [] }
});


module.exports = {
    Course: mongoose.model('Course', Schema)
}