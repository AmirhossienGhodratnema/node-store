const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    parent: { type: [mongoose.Types.ObjectId], ref: 'category', default: undefined },
}, {
    toJSON: {
        virtuals: true,
        versionKey : false,
    },
});


Schema.virtual('child', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
})


function autoPopulate(next) {    // Getting populate data in the model
    this.populate([
        {
            path: 'child',
            select: {
                '_id': 0,
                '__v': 0,
                'id': 0,
            },
        },
    ]);
    next();
}

Schema.pre('find', autoPopulate);
Schema.pre('findOne', autoPopulate);


module.exports = {
    Category: mongoose.model('Category', Schema)
}