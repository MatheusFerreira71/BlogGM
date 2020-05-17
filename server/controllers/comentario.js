const Comentario = require("../models/Comentario");

async function busca(req, res) {
  let criterio = {};

  const atrib = Object.keys(req.query)[0];
  const valor = Object.values(req.query)[0];

  // $options: 'i' => case insensitive
  criterio[atrib] = { $regex: valor, $options: "i" };

  console.log(`Critérios: ${criterio}`);

  try {
    const lista = await Comentario.find(criterio);
    res.send(lista);
  } catch (erro) {
    console.log(erro);
    res.status(500).send(erro);
  }
}

module.exports = {
  novo: async (req, res) => {
    try {
      await Comentario.create(req.body); // Post é um modelo, logo podemos usar os métodos do mongoose.
      // HTTP Status 201: Created
      res.sendStatus(201);
    } catch (erro) {
      console.log(erro);
      // HTTP 500: Internal Server Error
      res.status(500).send(erro);
    }
  },
  listar: async (req, res) => {
    if (Object.keys(req.query).length > 0) {
      // Se houver query string
      busca(req, res);
    } else {
      try {
        // find(), sem parâmetros, retorna todos.
        const lista = await Comentario.find().populate({
          path: "usuario",
          select: "nome email",
        });
        res.send(lista); // Enviamos a lista completa de post na resposta com o status implícito.
      } catch (erro) {
        console.log(erro);
        // HTTP 500: Internal Server Error
        res.status(500).send(erro);
      }
    }
  },
  obterUm: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Comentario.findById(id); // Encontra a post pelo seu id e retorna um objeto.
      if (post) {
        // post foi encontrado.
        res.send(post); // Http 200 implícito.
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
      // Encontra uma post pelo id e retorna um objeto com ela atualizada.
      // Esse método recebe um id e uma payload (carga de dados) contendo as alterações.
      const post = await Comentario.findByIdAndUpdate(id, req.body);
      if (post) {
        //post encontrado e atualizado
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
      // Encontra a post pelo seu id e retorna o objeto encontrado que foi excluído.
      const post = await Comentario.findByIdAndDelete(id);
      if (post) {
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
