const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

const ids = [];
for (let i = 0; i <= 10; i++) {
    ids.push(mongoose.Types.ObjectId());
};
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/BlogGMRelacional', () => {
 
  // Load Mongoose models
  seeder.loadModels([
    'src/models/Categoria.js',
    'src/models/SubCategoria.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Categoria', 'SubCategoria'], () => {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, () => {
      seeder.disconnect();
    });
 
  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Categoria',
        'documents': [
            {
                '_id': ids[0],
                'titulo': "Geral"
            },
            {
                '_id': ids[1],
                'titulo': "Games"
            },
            {
                '_id': ids[2],
                'titulo': "Tecnologia"
            },
            {
                '_id': ids[3],
                'titulo': "Smartphones"
            },
            {
                '_id': ids[4],
                'titulo': "E-Sports"
            },
            {
                '_id': ids[5],
                'titulo': "Segurança"
            },
            // Subcategorias de games
            {
                '_id': ids[6],
                'titulo': "Consoles"
            },
            {
                '_id': ids[7],
                'titulo': "Jogos"
            },
            {
                '_id': ids[8],
                'titulo': "Notícias"
            },
            {
                '_id': ids[9],
                'titulo': "Análises"
            }
        ]
    },
    {
        'model': "SubCategoria",
        'documents': [
            {
                'catPai': ids[1],
                'catFilha': ids[6]
            },
            {
                'catPai': ids[1],
                'catFilha': ids[7]
            },
            {
                'catPai': ids[1],
                'catFilha': ids[8]
            },
            {
                'catPai': ids[1],
                'catFilha': ids[9]
            }
        ]
    }
];