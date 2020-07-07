const express = require("express");
const CategoriaController = require("../controllers/CategoriaController");

const router = express.Router(); // Importação do router do express.

router.get("/", CategoriaController.index);
router.get("/nofilter", CategoriaController.indexNoFilter);

module.exports = router;
