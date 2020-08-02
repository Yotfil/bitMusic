const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'mi-clave-secreta'

exports.autenticacioDeUsuario = function(req, res, next){
    if(!req.headers.authorization){
        res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'})
    }

    const token = req.headers.authorization.replace(/['"]+/g, "")

    let payload;

    try{

        payload = jwt.decode(token, secret)

        if(payload.exp <= moment().unix()){
            res.status(401).send({message: 'El token ha expirado'})
        }

    }catch(ex){
        res.status(404).send({message: 'Token no valido'})
    }

    next()
}