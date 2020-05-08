const express = require('express');
const controllerC = require('../controllers/categoria');

const router = express.Router(); // Importação do router do express.

router.get('/', controllerC.listar);
router.get('/:id', controllerC.obterUm);
router.post('/', controllerC.novo);
router.put('/', controllerC.atualizar);
router.delete('/', controllerC.excluir);

module.exports = router;