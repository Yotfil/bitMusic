const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')

function pruebas(req, res){
    res.status(200).send({
        message:'Nos está funcionando el controlador'
    })
}



//Función para crear un usuario

function create(req, res) {
    let user = new User()

    let params = req.body

    user.firstName = params.firstName
    user.lastname = params.lastname
    user.email = params.email.toLowerCase()
    user.role = 'ROLE_USER'
    user.image = 'null'

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash
            if(user.firstName != null && user.lastname != null && user.email != null){
                if(User.findOne({email:user.email})){
                    console.log(User.findOne({email:user.email}))
                    res.status(200).send({message:"El correo ya existe"})
                }else{
                user.save((err, userStored)=>{
                    if(err){
                        res.status(500).send({message: 'Error al guardar usuario'})
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'})
                        }else{
                            res.status(200).send({user: userStored})
                        }
                    }
                })}
            }
        })
    }else{
        res.status(200).send({message: 'Introduce la contraseña'})
    }
}




function login(req, res){
    let params = req.body;
    let email = params.email
    let pass = params.password


    User.findOne({email: email.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'})
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'})
            }else{
                bcrypt.compare(pass, user.password, function(err, check){
                    if(check){
                        if(params.gethash){

                        }else{
                            res.status(200).send({user})
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido logearse'})
                    }
                })
            }
        }
    })
}

module.exports = {
    pruebas,
    create,
    login
}