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
      const { email } = req.body;
      await Usuario.findOneOrCreate({ email }, req.body); // Categoria é um modelo, logo podemos usar os métodos do mongoose.
      // HTTP Status 201: Created
      res.sendStatus(201);
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
};
