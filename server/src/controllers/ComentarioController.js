const Comentario = require("../models/Comentario");

module.exports = {
  create: async (req, res) => {
    try {
      await Comentario.create(req.body); // Categoria é um modelo, logo podemos usar os métodos do mongoose.
      // HTTP Status 201: Created
      res.json(req.body);
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.body._id;
      // Encontra uma usuario pelo id e retorna um objeto com ela atualizada.
      // Esse método recebe um id e uma payload (carga de dados) contendo as alterações.
      const comentario = await Comentario.findByIdAndUpdate(id, req.body);
      if (comentario) {
        //usuario encontrado e atualizado
        res.status(204).end(); // HTTP 204: No content
      } else {
        //Http 404: Not found.
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.body._id;
      // Encontra a post pelo seu id e retorna o objeto encontrado que foi excluído.
      const comentario = await Comentario.findByIdAndDelete(id);
      if (comentario) {
        //post encontrado e excluída.
        res.status(204).end(); // HTTP 204: No content
      } else {
        //Http 404: Not found.
        res.status(404).end();
      }
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
};
