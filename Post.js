const mongoose = require('mongoose');

const PostSchema123 = new mongoose.Schema({
    lat: {
        type: String,
        required: true
    },

    lng: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Coordinates', PostSchema123);