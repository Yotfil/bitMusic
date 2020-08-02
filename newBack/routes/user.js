const express = require('express')
const UserController = require('../controllers/user')
const middlewareAutenticacion = require('../middlewares/authenticated')


var api = express.Router()


api.post('/register', UserController.create)
api.post('/login', UserController.login)
api.put('/update/:id', middlewareAutenticacion.autenticacioDeUsuario, UserController.update)


module.exports = api