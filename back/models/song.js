const mongoose = require('mongoose')
// const Schema = mongoose.Schema


const SongSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    file: { type: String, required: true},
})


module.exports = mongoose.model('Song', SongSchema)