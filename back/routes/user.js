const express = require('express');
const UserController = require('../controllers/user')
const mdAuth = require('../middlewares/authenticated')


const api = express.Router()

api.get('/probando-controlador', mdAuth.authUser, UserController.pruebas)
api.post('/register', UserController.create)
api.post('/login', UserController.login)
api.put('/update/:id', mdAuth.authUser, UserController.update)
api.post('/upload-image-user/:id', UserController.uploadImg)
api.get('/get-image-user/:imgUser', UserController.getImg)

module.exports = api;

