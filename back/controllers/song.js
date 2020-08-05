const Song = require('../models/song')

exports.create = (req, res) =>{
    if(!req.body){
        return res.status(400).send({message: 'El contenido no puede estar vacío'})
    }

    if(!req.files){
        return res.status(400).send({
            message: 'Debes ingresar el archivo'
        })
    }

    //Configurando el archivo
    let routeFile = req.files.file.path//Obtenemos la ruta del archivo
    let splitFile = routeFile.split('\\')
    const songName = splitFile[splitFile.length -1]

    const song = new Song({
        number: parseInt(req.body.number),
        name: req.body.name,
        duration: req.body.duration,
        file: songName,
    })

    song.save().then( data => {
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message: err.message || 'Error al crear la canción'
        })
    })

}
