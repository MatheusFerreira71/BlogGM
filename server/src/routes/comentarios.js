const express = require('express');
const ComentarioController = require('../controllers/ComentarioController');

const router = express.Router(); // Importação do router do express.

router.get('/', ComentarioController.index);
router.post('/', ComentarioController.create);
router.put('/', ComentarioController.update);
router.delete('/', ComentarioController.remove);

module.exports = router;