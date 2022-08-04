const mongoose = require('mongoose');
const Reservas = require('../model/reservas-model');
const Usuarios = require('../model/usuarios-model');

let reservasController = {};

reservasController.listar = (req, res) => {
    Reservas.find({}).exec((err, reservas) => {
        if (err) {
            console.log(err);
        } else {
            res.send(reservas);
        }
    })
};

reservasController.crear = (req, res) => {
    let respuesta = [];

    let nuevaReserva = new Reservas(req.body);

    Usuarios.find({_id : req.body._id_usuario}).exec((err, usuarios) => {
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            if (Object.keys(usuarios).length > 0) {
                nuevaReserva.save((err) => {
                    let respuesta = [];
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({"Mensaje" : `Reserva registrada con éxito: ${req.body.fecha} ${req.body.tratamiento}`});
                    }
                });
            } else {
                res.send({"Mensaje" : `El usuario ${req.body._id_usuario} no existe`});
            }
        }
    });
};

reservasController.editar = (req, res) => {
    Reservas.findByIdAndUpdate(req.body.id, {$set: {
        _id_usuario: req.body._id_usuario,
        fecha: req.body.fecha,
        tratamiento: req.body.tratamiento
    }}, {new: false, runValidators: true}, (err, reserva) => {
        let respuesta = [];
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            res.send({"Mensaje" : `Reserva actualizada con éxito: ${req.body.fecha} ${req.body.tratamiento}`});
        }
    });
};

reservasController.borrar = (req, res) => {
    Reservas.deleteOne({_id: req.body.id}, (err) => {
        let respuesta = [];
        if (err) {
            for (const key in err.errors) {
                const objeto = {};
                objeto[key] = err.errors[key].properties.message;
                respuesta.push(objeto);
            }
            res.send(respuesta);
        } else {
            res.send({"Mensaje" : `Reserva eliminada con éxito`});
        }
    });
};

module.exports = reservasController;
