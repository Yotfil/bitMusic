const express = require('express')
const UserController = require('../controllers/user')


var api = express.Router()


api.post('/register', UserController.create)


module.exports = api