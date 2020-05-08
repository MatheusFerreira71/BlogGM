const express = require('express');
const controllerP = require('../controllers/post');

const router = express.Router(); // Importação do router do express.

router.get('/', controllerP.listar);
router.get('/:id', controllerP.obterUm);
router.post('/', controllerP.novo);
router.put('/', controllerP.atualizar);
router.delete('/', controllerP.excluir);

module.exports = router;