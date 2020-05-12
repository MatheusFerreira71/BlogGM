const mongoose = require("mongoose");

//Criação do modelo de dados.
const schema = mongoose.Schema({
  usuario: {
    type: mongoose.ObjectId,
    ref: "Usuario",
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  texto: {
    type: String,
    required: true,
  },
  edited: {
    type: Object,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  avaliacao: {
    type: Number,
    default: 0,
    required: true,
  },
});

// 1° parametro: Nome do modelo
// 2° parametro: Esquema do modelo
// 3° parametro: Nome da coleção => em que os objetos criados a partir do modelo serão armazenados no MongoDB

// Exportação do modelo de dados.
module.exports = mongoose.model("Comentario", schema, "comentarios");
