const express = require('express');
const ComentarioController = require('../controllers/ComentarioController');

const router = express.Router(); // Importação do router do express.

router.post('/', ComentarioController.create);
router.put('/', ComentarioController.update);
router.delete('/', ComentarioController.remove);

module.exports = router;