const mongoose = require('mongoose');



const Schema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
    title: { type: String, require: true },
    text: { type: String, require: true },
    shortText: { type: String, require: true },
    image: { type: String, require: true },
    tag: { type: [String], default: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'Category', require: true },
    comments: { type: [mongoose.Types.ObjectId], ref: 'Comment', default: [] },
    likes: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
    disLikes: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
    bookMarks: { type: [mongoose.Types.ObjectId], ref: 'User', default: [] },
}, { timestamps: true, toJSON: { virtuals: true } });

Schema.virtual('imageUrl').get(function () {
    return `${process.env.BASE_URL}${process.env.SERVER_PORT}/${this.image}`;
});

Schema.virtual('CommentBlog', { ref: 'Comment', localField: '_id', foreignField: 'blogID' });


module.exports = {
    Blog: mongoose.model('Blog', Schema)
}