const mongoose = require('mongoose');
const Tratamientos = require('../model/tratamientos-model');

let tratamientosController = {};

tratamientosController.listar = (req, res) => {
    Tratamientos.find({}).exec((err, tratamientos) => {
        if (err) {
            console.log(err);
        } else {
            res.send(tratamientos);
        }
    })
};

module.exports = tratamientosController;