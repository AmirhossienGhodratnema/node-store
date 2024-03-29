const mongoose = require('mongoose');

const Episodes = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, defult: 'unlock' },
    time: { type: String, defult: '00:00' },
    video: { type: String, defult: '' },
    chapter: { type: mongoose.Types.ObjectId, require: true },
    course: { type: mongoose.Types.ObjectId, require: true },
}, { toJSON: { virtuals: true } });
Episodes.virtual('videoUrl').get(function () {
    return `${process.env.BASE_URL}${process.env.SERVER_PORT}/${this.video}`
});

// BASE_URL = http://localhost:
// SERVER_PORT = 8000


const Chapter = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, defult: '' },
    episodes: { type: [Episodes], defult: [] },

});

const Schema = new mongoose.Schema({
    title: { type: String, require: true },
    shortText: { type: String, require: true },
    shortDescription: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    tags: { type: [String], defult: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'Category', require: true },
    comments: { type: [], defult: [] },
    likes: { type: [mongoose.Types.ObjectId], defult: [] },
    creator: { type: mongoose.Types.ObjectId, require: true },
    disLikes: { type: [mongoose.Types.ObjectId], defult: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], defult: [] },
    price: { type: Number, defult: 0 },
    discount: { type: Number, default: 0 },
    type: { type: String, defult: 'free', require: true },    // free, vip, cash
    time: { type: String, defult: '00:00:00' },
    status: { type: String, defult: 'holding' },    // holding, complated, noStart
    format: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    chapters: { type: [Chapter], defult: [] },
    students: { type: [mongoose.Types.ObjectId], ref: 'User', defult: [] }
}, { toJSON: { virtuals: true } });


Schema.virtual('imageUrl').get(function () {
    return `${process.env.BASE_URL}${process.env.SERVER_PORT}/${this.image}`;
})
Schema.index({ title: 'text', shortText: 'text', shortDescription: 'text', description: 'text' });


module.exports = {
    Course: mongoose.model('Course', Schema)
}