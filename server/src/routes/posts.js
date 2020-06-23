const express = require('express');
const PostController = require('../controllers/PostController');

const router = express.Router(); // Importação do router do express.

router.post('/', PostController.create);
router.put('/avaliar', PostController.avaliar);
router.put('/', PostController.update);
router.delete('/', PostController.delete);
router.get('/', PostController.index);
router.get('/name', PostController.indexByName);
router.get('/tagcat', PostController.indexCatOrTag);
router.get('/:id', PostController.show);

module.exports = router;