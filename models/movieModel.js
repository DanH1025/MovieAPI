const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vidQuality: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    poster: {
        type: Array,
        required: false
    },
    year: {
        type: Number,
        required: true
    },
    UID: {
        type: String,
        required: true
    }

},{timestamps: true})

module.exports = mongoose.model('movie' , movieSchema)