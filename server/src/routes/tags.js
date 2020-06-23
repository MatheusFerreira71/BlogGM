const express = require('express');
const TagsController = require('../controllers/TagController');

const router = express.Router(); // Importação do router do express.

router.get('/', TagsController.index);
router.post('/', TagsController.create);

module.exports = router;