const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tratamientosSchema = new Schema({
    tratamiento: {type: String, required:[true, "Es necesario un nombre para el tratamiento"], minLength:[4, "Mínimo de 4 caracteres"]},
    descripcion: {type: String, required: [true, "Es necesaria unadescripción"]},
    precio: {type: Number, required:[true, "Debe introducir un importe"]}
});

module.exports = mongoose.model('tratamientos', tratamientosSchema);