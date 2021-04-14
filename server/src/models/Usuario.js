const mongoose = require("mongoose");
const findOneOrCreate = require("mongoose-findoneorcreate");

//Criação do modelo de dados.
const schema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      default: '4512F37DF69526S-avatar-padrao.png'
    },
    isAdm: {
      type: Boolean,
      required: true
    },
    uniqueId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

schema.plugin(findOneOrCreate);

// 1° parametro: Nome do modelo
// 2° parametro: Esquema do modelo
// 3° parametro: Nome da coleção => em que os objetos criados a partir do modelo serão armazenados no MongoDB

// Exportação do modelo de dados.
module.exports = mongoose.model("Usuario", schema, "usuarios");
