const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reservasSchema = new Schema({
    _id_usuario: {type: String, required:[true, "Es necesario un usuario al que asignar la reserva"]},
    fecha: {type: Date, required:[true, "Debe introducir una fecha a la que asignar su reserva"]},
    tratamiento: {type: String, required:[true, "Es necesario introducir un tratamiento"], minLength:[4, "No puede dejar este campo en blanco"]}
});

module.exports = mongoose.model('reservas', reservasSchema);