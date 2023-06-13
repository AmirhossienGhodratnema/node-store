const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    comment: { type: String, require: true },
    parent: { type: mongoose.Types.ObjectId },
    createdAt: { type: Date, default: new Date().getTime() }
})


const Schema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
    shortText: { type: String, require: true },
    image: { type: String, require: true },
    tag: { type: [String], default: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'Category', require: true },
    comments: { type: [CommentSchema], default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
    disLikes: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
}, { timestamps: true, versionKey: false, toJSON: { virtuals: true, versionKey: false } });

Schema.virtual('imageUrl').get(function () {
    return `${process.env.BASE_URL}${process.env.SERVER_PORT}/${this.image}`;
})

module.exports = {
    Blog: mongoose.model('Blog', Schema)
}