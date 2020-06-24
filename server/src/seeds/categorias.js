const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

const ids = [
    '5ef2a733ed59a23e5cbcb161',
    '5ef2a733ed59a23e5cbcb162',
    '5ef2a733ed59a23e5cbcb163',
    '5ef2a733ed59a23e5cbcb164',
    '5ef2a733ed59a23e5cbcb165',
    '5ef2a733ed59a23e5cbcb166',
    '5ef2a733ed59a23e5cbcb167',
    '5ef2a733ed59a23e5cbcb168',
    '5ef2a733ed59a23e5cbcb169',
    '5ef2a733ed59a23e5cbcb16a'
];
 
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
                'titulo': "Consoles",
                'isSub': true
            },
            {
                '_id': ids[7],
                'titulo': "Jogos",
                'isSub': true
            },
            {
                '_id': ids[8],
                'titulo': "Notícias",
                'isSub': true
            },
            {
                '_id': ids[9],
                'titulo': "Análises",
                'isSub': true
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