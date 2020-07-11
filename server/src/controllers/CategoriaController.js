const Categoria = require("../models/Categoria");
const SubCategoria = require("../models/SubCategoria");

module.exports = {
  index: async (req, res) => {
    try {
      const categorias = await Categoria.find({ isSub: false }).sort({
        titulo: "asc",
      });
      const cats = categorias.map((categoria) => {
        const { _id, titulo } = categoria;
        return { _id, titulo, subs: [] };
      });
      const subCategorias = await SubCategoria.find().populate({
        path: "catFilha",
        select: "titulo",
      });

      for (const sub of subCategorias) {
        for (const cat of cats) {
          if (String(cat._id) == String(sub.catPai)) {
            cat.subs.push(sub.catFilha);
          }
        }
      }
      const parsedCategories = cats.map((categoria) => {
        const { _id, titulo, subs } = categoria;
        return subs.includes(undefined) || subs.length === 0
          ? { _id, titulo }
          : categoria;
      });
      res.json(parsedCategories);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  indexNoFilter: async (req, res) => {
    try {
      const categorias = await Categoria.find().sort({ titulo: "asc" });
      res.json(categorias);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  findAllSubsByParentId: async (req, res) => {
    try {
      const { parentId } = req.params;
      const subCats = await SubCategoria.find({ catPai: parentId })
        .populate({ path: "catFilha" })
        .select("catFilha");
      res.json(subCats);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
};
