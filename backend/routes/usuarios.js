const express = require('express');
const usuariosController = require('../controller/usuarios-controller');

const router = express.Router();


/* GET lista de usuarios */
router.get('/', usuariosController.listar);

/* POST crear usuarios */
router.post('/', usuariosController.crear);

/* PUT actualizar usuarios por id */
router.put('/', usuariosController.editar);

/* DELETE borrar usuarios por id */
router.delete('/', usuariosController.borrar);

module.exports = router;
