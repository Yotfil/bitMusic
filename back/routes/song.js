module.exports = (app) => {
    const song = require('../controllers/song')
    const connectMultiparty = require('connect-multiparty')
    const uploadSong = connectMultiparty({uploadDir: './assets/songs'})

    app.post('/create-song', uploadSong, song.create)
}

