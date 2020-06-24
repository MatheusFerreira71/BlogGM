const mongoose = require('mongoose');

//Criação do modelo de dados.
const schema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    corpo: {
        type: String,
        required: true
    },
    banner: {
        type: String
    }, 
    visualizacao: {
        type: Number,
        default: 0,
        required: true,
    },
    usuario: {
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
});

// 1° parametro: Nome do modelo
// 2° parametro: Esquema do modelo 
// 3° parametro: Nome da coleção => em que os objetos criados a partir do modelo serão armazenados no MongoDB

// Exportação do modelo de dados.
module.exports = mongoose.model('Post', schema, 'posts');