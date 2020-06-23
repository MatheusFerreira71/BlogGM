const mongoose = require('mongoose');

//Criação do modelo de dados.
const schema = mongoose.Schema({
    tagId: {
        type: mongoose.ObjectId,
        ref: "Tag",
        required: true,
    },
    postId: {
        type: mongoose.ObjectId,
        ref: "Post",
        required: true,
    }
});

// 1° parametro: Nome do modelo
// 2° parametro: Esquema do modelo 
// 3° parametro: Nome da coleção => em que os objetos criados a partir do modelo serão armazenados no MongoDB

// Exportação do modelo de dados.
module.exports = mongoose.model('PostTag', schema, 'posttags');