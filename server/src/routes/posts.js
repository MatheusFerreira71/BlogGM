const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router(); 

router.post("/", PostController.create);
router.put("/visualizacao", PostController.visualizacao);
router.put("/", PostController.update);
router.delete("/", PostController.delete);
router.get("/", PostController.index);
router.get("/destaques", PostController.indexDestaques);
router.get("/busca", PostController.indexCatOrTag);
router.get("/:id", PostController.show);

module.exports = router;
