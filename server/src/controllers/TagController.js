const Tag = require('../models/Tag');

module.exports = {
    index: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.json(tags);
        } catch (erro) {
            console.log(erro);
            res.status(500).send(erro);
        }
    },
    create: async (req, res) => {
        try {
            await Tag.findOneOrCreate(req.body, req.body); // Categoria é um modelo, logo podemos usar os métodos do mongoose.
            // HTTP Status 201: Created
            res.sendStatus(201);
        } catch (erro) {
            console.log(erro);
            // HTTP 500: Internal Server Error
            res.status(500).send(erro);
        }
    }
}