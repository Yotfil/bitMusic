const bcrypt = require('bcrypt-nodejs')
const EntidadUser = require('../models/user')

//Función crear Usuario
function create(req, res){
    let newUser = new EntidadUser()

    let body = req.body

    newUser.firstName = body.firstName
    newUser.lastname = body.lastname
    newUser.email = body.email.toLowerCase()
    newUser.role = 'Role_user'
    newUser.image = 'null'


    if(body.password){
        bcrypt.genSalt(10, (err, salt)=>{
            if(err){
                console.log(err)
            }
            bcrypt.hash(body.password, salt, null, function(err, hash){
                newUser.password = hash
                if(newUser.firstName != null && newUser.lastname != null && newUser.email != null){
                    EntidadUser.findOne({email: newUser.email}, (err, userEmail)=>{
                        if(userEmail){
                            console.log('Ya existe')
                            res.status(200).send({message:"El correo ya existe"})
                        }else{
                            newUser.save((err, userSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error al crear el usuario'})
                                }else{
                                    if(!userSaved){
                                        res.status(400).send({message: 'No se guardo el usuario'})
                                    }else{
                                        res.status(200).send({newUser: userSaved })
                                    }
                                }
                            })
                        }
                    })

                }else{
                    res.status(200).send({message: 'Llena todos los campos'})
                }

            })
        })
    }else{
        res.status(200).send({message: 'Introduce la contraseña'})
    }
}

module.exports = {
    create
}