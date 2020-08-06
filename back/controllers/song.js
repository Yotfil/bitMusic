const Song = require('../models/song')
const { count } = require('../models/song')

/**
 * Función la cual permitirá validar si el body está vacío o si existe algún archivo para la canción
 * @param {*} req => Parametros que se envían desde las funciones create y update.
 * @param {*} res => Respuesta a retornar.
 */
function verificarDatos(req, res) {
    if (!req.body) {
        return res.status(400).send({ message: 'El contenido no puede estar vacío' })
    }

    if (!req.files) {
        return res.status(400).send({
            message: 'Debes ingresar el archivo'
        })
    }
}

/**
 * Función creada para procesar el archivo de la canción y obtener el nombre de la canción.
 * @param {*} req => Requerimientos enviados desde el body.
 */
function obtenerNombreCancion(req) {
    let routeFile = req.files.file.path //Obtenemos la ruta del archivo
    let splitFile = routeFile.split('\\')
    return splitFile[splitFile.length - 1]
}


exports.create = (req, res) => {

    verificarDatos(req, res)

    Song.countDocuments().then(count => {
        const song = new Song({
            number: (count + 1),
            name: req.body.name,
            duration: req.body.duration,
            file: obtenerNombreCancion(req),
        })

        song.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Error al crear la canción'
            })
        })
    })
}

/**
 * Función creada para actualizar las canciones almacenadas en nuestra base de datos.
 * @param {*} req => Requerir los parametros que enviamos en la solicitud: Postman, Angular.
 * @param {*} res => Respuesta que vamos a retornar.
 */
exports.update = (req, res) => {
    verificarDatos(req, res)

    const song = {
            name: req.body.name,
            duration: req.body.duration,
            file: obtenerNombreCancion(req)
        }
        /**
         * Parametros de findByIdAndUpdate:
         * Primer parametro: El id del objeto a modificar.
         * Segundo parametros: Datos a modificar.
         */

    Song.findByIdAndUpdate(req.params.idSong, song, { new: true }).then(song => {
        if (!song) {
            return res.status(404).send({
                message: "No se encontró la canción"
            })
        }
        res.send(song)
    }).catch(error => {
        if (error.kind == 'ObjectId') {
            return res.status(404).send({
                message: "No se encontró la canción"
            })
        }
        return res.status(500).send({
            message: "Error al actualizar la canción " + error
        })
    })

}

/**
 * Función creada para obtener todas la canciones
 * @param {*} req
 * @param {*} res
 */
exports.findAll = (req, res) => {
    let page = ((req.params.page - 1) * 10)
    Song.find({}, null, { skip: page, limit: 10 }).then(songs => {
        res.send(songs)
    }).catch(error => {
        res.status(500).send({
            message: error.message || "Error al obtener las canciones"
        })
    })
}