const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    groupnameTH: {
        type: String,
        required: true
    },
    groupnameEN: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);