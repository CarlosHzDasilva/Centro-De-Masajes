const mongoose = require('mongoose');
const Usuarios = require('../model/usuarios-model');
const Reservas = require('../model/reservas-model');
const fs = require('fs');

let usuariosController = {};

usuariosController.listar = (req, res) => {
    Usuarios.find({}).exec((err, usuarios) => {
        if (err) {
            console.log(err);
        } else {
            res.send(usuarios);
        }
    });
};

usuariosController.buscar = (req, res) => {
    Usuarios.findOne({email: req.headers.email}).exec((err, usuario) => {
        if (err) {
            console.log(err);
        } else {
            if (usuario == null) {
                res.send({"Error": "Email o contraseña incorrecta"});
            } else {
                if (usuario.password == req.headers.password) {
                    res.send({
                        _id: usuario._id,
                        nombre: usuario.nombre,
                        apellidos: usuario.apellidos,
                        telefono: usuario.telefono,
                        email: usuario.email,
                        imagen: usuario.imagen
                    });
                } else {
                    res.send({"Error": "Email o contraseña incorrecta"});
                }
            }
        }
    });
};

usuariosController.crear = (req, res) => {
    let respuesta = [];

    let nuevoUsuario = new Usuarios(req.body);

    if (req.body.imagen !== "") {
        nuevoUsuario.imagen = "";
    } else if (req.body.imagen === "") {
        nuevoUsuario.imagen = null;
    }

    nuevoUsuario.save((err) => {
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            if (req.body.imagen !== "") {
                let img = req.body.imagen;
                let data = img.replace(/^data:image\/\w+;base64,/, "");
                let buf = Buffer.from(data, 'base64');
                fs.writeFile('./public/images/usuarios/' + req.body.email + '.jpg', buf, (err) => {
                    if (err) {
                        res.send({"Error: ": err});
                    } else {
                        res.send({"Mensaje" : `Registro completado satisfactoriamente.`});
                    }
                })
            } else {
                res.send({"Mensaje" : `Registro completado satisfactoriamente.`});
            }
        }
    });
};

usuariosController.editar = (req, res) => {
    let respuesta = [];

    let usuarioActualizado = new Usuarios(req.body);

    if (req.body.imagen !== "") {
        usuarioActualizado.imagen = "";
    }

    Usuarios.findByIdAndUpdate(req.body.id, {$set: {
        imagen: usuarioActualizado.imagen,
        nombre: usuarioActualizado.nombre,
        apellidos: usuarioActualizado.apellidos,
        password: usuarioActualizado.password,
        telefono: usuarioActualizado.telefono,
        email: usuarioActualizado.email
    }}, {new: false, runValidators: true},
    function(err, usuario) {
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            if (req.body.imagen !== "") {
                let img = req.body.imagen;
                let data = img.replace(/^data:image\/\w+;base64,/, "");
                let buf = Buffer.from(data, 'base64');
                fs.writeFile('./public/images/usuarios/' + req.body.email + '.jpg', buf, (err) => {
                    if (err) {
                        res.send({"Error: ": err});
                    } else {
                        res.send({"Mensaje" : `Actualización completada satisfactoriamente.`});
                    }
                })
            } else {
                res.send({"Mensaje" : `Actualización completada satisfactoriamente.`});
            }
        }
    });
};

usuariosController.borrar = (req, res) => {
    let respuesta = [];

    Reservas.find({_id_usuario : req.body.id}).exec((err, reservas) => {
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            if (Object.keys(reservas).length == 0) {
                Usuarios.deleteOne({_id : req.body.id}, (error) => {
                    if (err) {
                        for (const key in err.errors) {
                            const objeto = {};
                            objeto[key] = err.errors[key].properties.message;
                            respuesta.push(objeto);
                        }
                        res.send(respuesta);
                    } else {
                        if (req.body.imagen === "") {
                            const path = `./public/images/usuarios/${req.body.email}.jpg`;
                            fs.unlink(path, (err) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                } else {
                                    res.send({"Mensaje": `Usuario ${req.body.id} eliminado correctamente`});
                                }
                            })
                        } else {
                            res.send({"Mensaje": `Usuario ${req.body.id} eliminado correctamente`});
                        }
                    }
                });
            } else {
                res.send({"Mensaje": `No se pueden eliminar usuarios con reservas abiertas`})
            }
        }
    })
};

module.exports = usuariosController;
