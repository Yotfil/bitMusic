const mongoose = require('mongoose')
const app = require('./app')
const port = 3000

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/newDbsBitMusic', {useNewUralParser:true, useUnifiedTopology:true}, (err, res)=>{
    if(err){
        console.log('No nos pudimos conectar')
    }else{
        console.log('la base de datos está corriendo correctamente...')
        app.listen(port, ()=>{
            console.log(`El demonio está vigilando en el puerto ${port}`)
        })
    }
})