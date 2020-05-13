const mongoose = require("mongoose");

//Criação do modelo de dados.
const schema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  avaliacao: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  edited: {
    type: Object,
  },
  categorias: {
    type: Object,
    required: true,
    default: {},
  },
  tags: {
    type: Object,
    required: true,
    default: {},
  },
  usuario: {
    type: mongoose.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// 1° parametro: Nome do modelo
// 2° parametro: Esquema do modelo
// 3° parametro: Nome da coleção => em que os objetos criados a partir do modelo serão armazenados no MongoDB

// Exportação do modelo de dados.
module.exports = mongoose.model("Post", schema, "posts");
