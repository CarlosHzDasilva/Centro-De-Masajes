const express = require('express');
const tratamientosController = require('../controller/tratamientos-controller');

const router = express.Router();

/* GET lista de tratamientos */
router.get('/', tratamientosController.listar);

module.exports = router;
