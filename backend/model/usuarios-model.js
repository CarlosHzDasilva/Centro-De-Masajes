const mongoose = require('mongoose');
//const encrypt = require('mongoose-encryption');
const uniqueValidator = require('mongoose-unique-validator');

//const ficheroEnv = require('dotenv').config();

let Schema = mongoose.Schema;

let usuariosSchema = new Schema({
    imagen: {type: String},
    nombre: {type: String, required:[true, "Debe introducir un nombre"], validate: {
        validator: function(dato) {
            return /[a-zA-Z]/.test(dato);
        }, message: nombre => `${nombre.value} no es un nombre válido`
    }},
    apellidos: {type: String, required:[true, "Debe introducir un apellido"]},
    password: {type: String, bcrypt: true, minLength:[8, "La contraseña debe tener entre 8 y 20 caracteres"], maxLength:[20], required:[true, "Debe introducir una contraseña"]},
    telefono: {type: String},
    email: {type: String, unique: true}
})

usuariosSchema.plugin(uniqueValidator, {message: "Correo ({VALUE}) ya registrado, {PATH} debe ser único"});
//usuariosSchema.plugin(encrypt, {secret: ficheroEnv.parsed.clave, encryptedFields: ['password']});

module.exports = mongoose.model('usuarios', usuariosSchema);
