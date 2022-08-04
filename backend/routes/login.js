const express = require('express');
const usuariosController = require('../controller/usuarios-controller');

const router = express.Router();

/* GET identifica al usuario */
router.get('/', usuariosController.buscar);

module.exports = router;
