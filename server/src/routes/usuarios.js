const express = require("express");
const UsuarioController = require("../controllers/UsuarioController");

const router = express.Router(); // Importação do router do express.

router.post("/", UsuarioController.create);
router.get("/", UsuarioController.index);
router.get("/user-ver/:username", UsuarioController.findByUsername);
router.get("/:id", UsuarioController.show);
router.get("/search-auth-user/:uniqueId", UsuarioController.findByUniqueId);

module.exports = router;
