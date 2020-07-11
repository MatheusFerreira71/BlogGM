import multer from "multer";
import multerConfig from "../config/multer";

const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router(); // Importação do router do express.
const upload = multer(multerConfig);

router.post("/", upload.single("image"), PostController.create);
router.put("/visualizacao", PostController.visualizacao);
router.put("/", PostController.update);
router.delete("/", PostController.delete);
router.get("/", PostController.index);
router.get("/destaques", PostController.indexDestaques);
router.get("/busca", PostController.indexCatOrTag);
router.get("/:id", PostController.show);

module.exports = router;
