const express = require('express');
const controllerT = require('../controllers/tag');

const router = express.Router(); // Importação do router do express.

router.get('/', controllerT.listar);
router.get('/:id', controllerT.obterUm);
router.post('/', controllerT.novo);
router.put('/', controllerT.atualizar);
router.delete('/', controllerT.excluir);

module.exports = router;