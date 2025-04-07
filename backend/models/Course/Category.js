const mongoose = require('mongoose');

// category model
const CategorySchema = new mongoose.Schema({
    catnameTH: {
        type: String,
        required: true
    },
    catnameEN: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Category', CategorySchema);
