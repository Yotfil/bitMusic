const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user')
const jwt = require('../services/jwt')


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
        bcrypt.genSalt(10, (err, salt)=>{
            if(err){
                console.log(err)
            }else{
                bcrypt.hash(params.password, salt, null, function(err, hash){
                    user.password = hash
                    if(user.firstName != null && user.lastname != null && user.email != null){
                        User.findOne({email:user.email}, (err, userEmail)=>{
                            if(userEmail){
                                console.log("Ya existe")
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
                        })

                    }
                })
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
                            res.status(200).send({
                                token: jwt.userToken(user)
                            })
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


function update(req, res){
    const userId = req.params.id
    let paramsBody = req.body

    if(paramsBody.password){
        bcrypt.hash(paramsBody.password, null, null, function(err, hash){
            paramsBody.password = hash
            console.log(paramsBody.password)
            User.findByIdAndUpdate(userId, paramsBody, (err, userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'Error al actualizar usuario'})
                }else{
                    if(!userUpdated){
                        res.status(404).send({message: 'No se ha podido actualizar el usuario'})
                    }else{
                        res.status(200).send({user: userUpdated})
                    }
                }
            })
        })
    }else{
        User.findByIdAndUpdate(userId, paramsBody, (err, userUpdated)=>{
            if(err){
                res.status(500).send({message: 'Error al actualizar usuario'})
            }else{
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'})
                }else{
                    res.status(404).send({user: userUpdated})
                }
            }
        })
    }
}



function uploadImg(req, res){
    const userId = req.params.id

    if(req.files){
        let userImage = req.files.image
        let nameImgUser = userImage.name
        console.log(nameImgUser)
        let imgSplit = nameImgUser.split('\.')
        console.log(imgSplit)
        let imgUserExt = imgSplit[1]

        if(imgUserExt =='png' || imgUserExt == 'jpg'){
            User.findByIdAndUpdate(userId, {image:nameImgUser}, (err, userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'No se ha podido subir la imágen'})
                }else{
                    if(!userUpdated){
                        res.status(400).send({message: 'No se ha encontrado el usuario'})
                    }else{
                        userImage.mv(`./assets/users/${nameImgUser}`, (err)=>{
                            if(err){
                                return res.status(500).send({message:'No se subio la imagen del usuario'})
                            }else{
                                return res.status(200).send({user:userUpdated})
                            }
                        })
                    }
                }
            })
        }else{
            res.status(200).send({message: 'Extension de archivo incorrecta'})
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen'})
    }
}


function getImg(req, res){
    const imgUser= req.params.imgUser

    const imgRoute = `./assets/users/${imgUser}`

    fs.exists(imgRoute, function(exists){
        if(exists){
            res.sendFile(path.resolve(imgRoute))
        }else{
            res.status(200).send({message:'No existe la imagen'})
        }
    })
}




module.exports = {
    pruebas,
    create,
    login,
    update,
    uploadImg,
    getImg
}