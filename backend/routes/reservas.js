const express = require('express');
const reservasController = require('../controller/reservas-controller');

const router = express.Router();

/* GET lista de reservas */
router.get('/', reservasController.listar);

/* POST crear reservas */
router.post('/', reservasController.crear);

/* PUT actualizar reservas por id */
router.put('/', reservasController.editar);

/* DELETE borrar reservas por id */
router.delete('/', reservasController.borrar);

module.exports = router;
