const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router(); // Importação do router do express.

router.post('/', UsuarioController.create);

module.exports = router;