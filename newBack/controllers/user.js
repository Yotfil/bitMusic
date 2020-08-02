const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt-nodejs')
const EntidadUser = require('../models/user')
const jwt = require('../services/jwt')

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


//Función de login
function login(req,res){
    let body = req.body
    let email = body.email
    let pass = body.password

    EntidadUser.findOne({email: email.toLowerCase()}, (err, usuarioObetnido)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'})
        }else{
            if(!usuarioObetnido){
                res.status(404).send({message: 'No se encontró el usuario'})
            }else{
                bcrypt.compare(pass, usuarioObetnido.password, function(err, check){
                    if(check){
                        if(body.gethash){
                            res.status(200).send({token: jwt.userToken(usuarioObetnido)})
                        }else{
                            res.status(200).send({user: usuarioObetnido})
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no se ha podido logear'})
                    }
                })
            }
        }
    })
}


//Función de actualizar usuario
function update(req, res){
    const userId = req.params.id
    const body = req.body


    if(body.password){
        bcrypt.hash(body.password, null, null, function(err, hash){
            body.password = hash

            EntidadUser.findByIdAndUpdate(userId, body, (err, usuarioActualizado)=>{
                if(err){
                    res.status(500).send({message: 'Error al actualizar el usuario'})
                }else{
                    if(!usuarioActualizado){
                        res.status(404).send({message: 'No se encontró ningún usuario'})
                    }else{
                        res.status(200).send({user: usuarioActualizado})
                    }
                }
            })
        })
    }else{
        EntidadUser.findByIdAndUpdate(userId, body, (err, usuarioActualizado)=>{
            if(err){
                res.status(500).send({message: 'Error al actualizar el usuario'})
            }else{
                if(!usuarioActualizado){
                    res.status(404).send({message: 'No se encontró ningún usuario'})
                }else{
                    res.status(200).send({user: usuarioActualizado})
                }
            }
        })
    }
}


//Función de subir imagen
function uploadImg(req, res){
    const userId = req.params.id

    if(req.files){
        let userImage = req.files.image
        let nameImgUser = userImage.name
        let imgSplit = nameImgUser.split('\.')
        let imgUserExt = imgSplit[1]

        if(imgUserExt == 'png' || imgUserExt == 'jpg'){
            EntidadUser.findByIdAndUpdate(userId, {image: nameImgUser}, (err, usuarioActualizado)=>{
                if(err){
                    res.status(500).send({message: 'No se ha podido subir la imagen'})
                }else{
                    if(!usuarioActualizado){
                        res.status(404).send({message: 'No se encontró ningún usuario'})
                    }else{
                        userImage.mv(`./assets/users/${nameImgUser}`, (err)=>{
                            if(err){
                                res.status(500).send({message:'No se subió la imagen del usuario'})
                            }else{
                                res.status(200).send({user:usuarioActualizado})
                            }
                        })
                    }
                }
            })
        }else{
            res.status(200).send({message: 'La extensión no es correcta'})
        }
    }else{
        res.status(400).send({message: 'No se ha subido ninguna imagen'})
    }
}


//Función para taer la imagen
function getImg(req, res){
    const nameImgUser = req.params.imgUser

    const imgRoute = `./assets/users/${nameImgUser}`

    fs.exists(imgRoute, function(exists){
        if(exists){
            res.sendFile(path.resolve(imgRoute))
        }else{
            res.status(200).send({message:'No existe la imagen'})
        }

    })
}

module.exports = {
    create,
    login,
    update,
    uploadImg,
    getImg
}

