const express = require('express');
const UserController = require('../controllers/user')


const api = express.Router()

api.get('/probando-controlador', UserController.pruebas)
api.post('/register', UserController.create)
api.post('/login', UserController.login)

module.exports = api;

