const Categoria = require('../models/Categoria');
const SubCategoria = require('../models/SubCategoria');

module.exports = {
    index: async (req, res) => {
        try {
            const categorias = await Categoria.find();
            res.json(categorias);
        } catch (erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    }
}