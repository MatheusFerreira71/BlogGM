const Usuario = require("../models/Usuario");

module.exports = {
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id); // Encontra a usuario pelo seu id e retorna um objeto.
      if (usuario) {
        // usuario foi encontrado.
        res.json(usuario); // Http 200 implícito.
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
  create: async (req, res) => {
    try {
      const createdUser = await Usuario.create(req.body);
      res.json(createdUser);
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
      const usuario = await Usuario.findByIdAndUpdate(id, req.body);
      if (usuario) {
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
  index: async (req, res) => {
    try {
      const users = await Usuario.find();
      res.json(users);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  findByUsername: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await Usuario.findOne({ username });
      res.json(user);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  },
  findByUniqueId: async (req, res) => {
    try {
      const { uniqueId } = req.params;
      const user = await Usuario.findOne({ uniqueId });
      res.json(user);
    } catch (erro) {
      console.log(erro);
      res.status(500).send(erro);
    }
  }
};
