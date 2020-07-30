const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//Rutas
const user_routes = require('./routes/user')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//middleware
app.use('/api', user_routes)


// app.get('/pruebas', (req, res) =>{
//     res.status(200).send({message: 'Está conectada nuestra API'})
// })


module.exports = app;
