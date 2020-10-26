const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    content: String
})

module.exports = mongoose.model('home', schema)