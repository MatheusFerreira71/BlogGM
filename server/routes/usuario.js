const express = require('express');
const controllerU = require('../controllers/usuario');

const router = express.Router(); // Importação do router do express.

router.get('/', controllerU.listar);
router.get('/:id', controllerU.obterUm);
router.post('/', controllerU.novo);
router.put('/', controllerU.atualizar);
router.delete('/', controllerU.excluir);

module.exports = router;