const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()
app.use(fileUpload())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Cargar rutas
const user_routes = require('./routes/user')


app.use ('/api', user_routes)





module.exports = app;