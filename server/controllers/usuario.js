const Usuario = require('../models/Usuario');

module.exports = {
    novo: async (req, res) => {
        try {
            await Usuario.create(req.body); // Usuario é um modelo, logo podemos usar os métodos do mongoose.
            // HTTP Status 201: Created
            res.sendStatus(201);
        }
        catch (erro) {
            console.log(erro);
            // HTTP 500: Internal Server Error
            res.status(500).send(erro);
        }
    },
    listar: async (req, res) => {
        try {
            // find(), sem parâmetros, retorna todos.
            const lista = await Usuario.find();
            res.send(lista); // Enviamos a lista completa de usuario na resposta com o status implícito.
        } catch (erro) {
            console.log(erro);
            // HTTP 500: Internal Server Error
            res.status(500).send(erro);
        }
    },
    obterUm: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await Usuario.findById(id); // Encontra a usuario pelo seu id e retorna um objeto.
            if (usuario) { // usuario foi encontrado.
                res.send(usuario); // Http 200 implícito.
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
            // Encontra uma usuario pelo id e retorna um objeto com ela atualizada. 
            // Esse método recebe um id e uma payload (carga de dados) contendo as alterações. 
            const usuario = await Usuario.findByIdAndUpdate(id, req.body);
            if (usuario) { //usuario encontrado e atualizado
                res.status(204).end();// HTTP 204: No content
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
            // Encontra a usuario pelo seu id e retorna o objeto encontrado que foi excluído.
            const usuario = await Usuario.findByIdAndDelete(id);
            if (usuario) { //usuario encontrado e excluída.
                res.status(204).end();// HTTP 204: No content
            } else {
                //Http 404: Not found.
                res.status(404).end();
            }
        } catch (erro) {
            console.log(erro);
            // HTTP 500: Internal Server Error
            res.status(500).send(erro);
        }
    }
}