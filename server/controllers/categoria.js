const Categoria = require("../models/Categoria");

module.exports = {
  novo: async (req, res) => {
    try {
      await Categoria.create(req.body); // Categoria é um modelo, logo podemos usar os métodos do mongoose.
      // HTTP Status 201: Created
      res.sendStatus(201);
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  listar: async (req, res) => {
    try {
      // find(), sem parâmetros, retorna todos.
      const lista = await Categoria.find()
      res.send(lista); // Enviamos a lista completa de categoria na resposta com o status implícito.
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  obterUm: async (req, res) => {
    try {
      const id = req.params.id;
      const categoria = await Categoria.findById(id); // Encontra a categoria pelo seu id e retorna um objeto.
      if (categoria) {
        // categoria foi encontrado.
        res.send(categoria); // Http 200 implícito.
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
  atualizar: async (req, res) => {
    try {
      const id = req.body._id;
      // Encontra uma categoria pelo id e retorna um objeto com ela atualizada.
      // Esse método recebe um id e uma payload (carga de dados) contendo as alterações.
      const categoria = await Categoria.findByIdAndUpdate(id, req.body);
      if (categoria) {
        //categoria encontrado e atualizado
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
  excluir: async (req, res) => {
    try {
      const id = req.body._id;
      // Encontra a categoria pelo seu id e retorna o objeto encontrado que foi excluído.
      const categoria = await Categoria.findByIdAndDelete(id);
      if (categoria) {
        //categoria encontrado e excluída.
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
