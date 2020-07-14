const express = require("express");
const TagsController = require("../controllers/TagController");

const router = express.Router(); // Importação do router do express.

router.get("/", TagsController.index);
router.get("/name", TagsController.indexByName);
router.post("/", TagsController.create);
router.delete("/", TagsController.remove);

module.exports = router;
