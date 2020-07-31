const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SongSchema = Schema ({
    number: Number,
    name: String,
    duration: String,
    file: String,
    _id_album:{type: Schema.ObjectId, ref: 'Album'},
})

module.exports = mongoose.model('Song', SongSchema)