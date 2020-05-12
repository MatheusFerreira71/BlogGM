const express = require("express");
const controllerCo = require("../controllers/comentario");

const router = express.Router(); // Importação do router do express.

router.get("/", controllerCo.listar);
router.get("/:id", controllerCo.obterUm);
router.post("/", controllerCo.novo);
router.put("/", controllerCo.atualizar);
router.delete("/", controllerCo.excluir);

module.exports = router;
