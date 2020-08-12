// module.exports = (app) => {
//     const song = require('../controllers/song')
//     const multipart = require('connect-multiparty')
//     const uploadSong = multipart({uploadDir: './assets/songs'})

//     app.post('/create-song', uploadSong, song.create)
// }
const express = require('express')
const song = require('../controllers/song')


const api = express.Router()
const multipart = require('connect-multiparty')
const uploadSong = multipart({ uploadDir: './assets/songs' })

api.post('/create-song', uploadSong, song.create)
api.put('/update-song/:idSong', uploadSong, song.update)
api.get('/getAll/:page', song.findAll)

module.exports = api