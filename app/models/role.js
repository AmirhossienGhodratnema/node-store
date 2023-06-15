const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    title: { type: String, unique: true },
    description: { type: String, unique: true },
    permissions: { type: [mongoose.Types.ObjectId], ref: 'Permissions', default: [] },
}, { toJSON: { virtuals: true } });


module.exports = {
    Role: mongoose.model('Role', Schema)
}