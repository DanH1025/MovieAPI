
const mongoose = require('mongoose')

const user = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('user', user)