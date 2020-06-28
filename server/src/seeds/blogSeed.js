const seeder = require('mongoose-seed');
const mongoose = require('mongoose');

const categoriasIds = [
    '5ef2a733ed59a23e5cbcb161',
    '5ef2a733ed59a23e5cbcb162',
    '5ef2a733ed59a23e5cbcb163',
    '5ef2a733ed59a23e5cbcb164',
    '5ef2a733ed59a23e5cbcb165',
    '5ef2a733ed59a23e5cbcb166'
];

const tagIds = [
    '5ef2a733ed59a23e5cbcb168',
    '5ef2a733ed59a23e5cbcb169',
    '5ef2a733ed59a23e5cbcb16a',
    '5ef2a733ed59a23e5cbcb16b',
    '5ef2a733ed59a23e5cbcb16c',
    '5ef2a733ed59a23e5cbcb16d',
    '5ef2a733ed59a23e5cbcb16e',
    '5ef2a733ed59a23e5cbcb16f',
    '5ef2a733ed59a23e5cbcb16g',
    '5ef2a733ed59a23e5cbcb16h',
    '5ef2a733ed59a23e5cbcb16i',
    '5ef2a733ed59a23e5cbcb16j',
    '5ef2a733ed59a23e5cbcb16k',
    '5ef2a733ed59a23e5cbcb16l',
    '5ef2a733ed59a23e5cbcb16m',
    '5ef2a733ed59a23e5cbcb16n',
    '5ef2a733ed59a23e5cbcb16o',
    '5ef2a733ed59a23e5cbcb16p',
    '5ef2a733ed59a23e5cbcb16q',
    '5ef2a733ed59a23e5cbcb16r',
    '5ef2a733ed59a23e5cbcb16s',
    '5ef2a733ed59a23e5cbcb16t',
]

const userIds = ['5ef2a733ed59a23e5cbcb16u', '5ef2a733ed59a23e5cbcb16u'];
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/BlogGMRelacional', () => {
 
  // Load Mongoose models
  seeder.loadModels([
    'src/models/Categoria.js',
    'src/models/SubCategoria.js',
    'src/models/Usuario.js',
    'src/models/Tag.js',
    'src/models/Post.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Categoria', 'SubCategoria', 'Usuario', 'Tag'], () => {
 
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
                '_id': categoriasIds[0],
                'titulo': "Análises"
            },
            {
                '_id': categoriasIds[1],
                'titulo': "Notícias"
            },
            // Subcategorias de notícias
            {
                '_id': categoriasIds[2],
                'titulo': "Games",
                'isSub': true
            },
            {
                '_id': categoriasIds[3],
                'titulo': "Smartphones",
                'isSub': true
            },
            {
                '_id': categoriasIds[4],
                'titulo': "Tecnologia",
                'isSub': true
            },
            {
                '_id': categoriasIds[5],
                'titulo': "Entretenimento",
                'isSub': true
            }
        ]
    },
    {
        'model': "SubCategoria",
        'documents': [
            {
                'catPai': categoriasIds[1],
                'catFilha': categoriasIds[2]
            },
            {
                'catPai': categoriasIds[1],
                'catFilha': categoriasIds[3]
            },
            {
                'catPai': categoriasIds[1],
                'catFilha': categoriasIds[4]
            },
            {
                'catPai': categoriasIds[1],
                'catFilha': categoriasIds[5]
            }
        ]
    },
    {
        'model': "Usuario",
        'documents': [
            {
                '_id': userIds[0],
                'nome': "Matheus Ferreira",
                'username': "MatheusFerreira71",
                'email': "matheus.ferreira48@fatec.sp.gov.br",
                'bio': "Administrador, analista de games, criador de conteúdo, influenciador...",
                'avatar': "https://avatars0.githubusercontent.com/u/44984801?s=460&u=93d692bc3440e7773b20c01c31d9a0e09c21a9e4&v=4"
            },
            {
                '_id': userIds[1],
                'nome': "Gustavo Pazeto",
                'username': "Pazeto22",
                'email': "gustavo.ferreira@fatec.sp.gov.br",
                'bio': "Administrador, analista de games, criador de conteúdo, influenciador...",
                'avatar': "https://avatars2.githubusercontent.com/u/50267466?s=460&u=39392abeca1a060f0773acbdbfd18bfb54f48bc1&v=4"
            },
        ]
    },
    {
        'model': "Tag",
        'documents': [
            {
                '_id': tagIds[0],
                'titulo': "RPG"
            },
            {
                '_id': tagIds[1],
                'titulo': "JRPG"
            },
            {
                '_id': tagIds[2],
                'titulo': "Atlus"
            },
            {
                '_id': tagIds[3],
                'titulo': "P Studio"
            },
            {
                '_id': tagIds[4],
                'titulo': "Persona"
            },
            {
                '_id': tagIds[5],
                'titulo': "Persona 5"
            },
            {
                '_id': tagIds[6],
                'titulo': "Ação"
            },
            {
                '_id': tagIds[7],
                'titulo': "Aventura"
            },
            {
                '_id': tagIds[8],
                'titulo': "Terror"
            },
            {
                '_id': tagIds[9],
                'titulo': "Resident Evil"
            },
            {
                '_id': tagIds[10],
                'titulo': "Resident Evil 3"
            },
            {
                '_id': tagIds[11],
                'titulo': "Capcom"
            },
            {
                '_id': tagIds[12],
                'titulo': "Activision"
            },
            {
                '_id': tagIds[13],
                'titulo': "Crash Bandicoot"
            },
            {
                '_id': tagIds[14],
                'titulo': "Crash Bandicoot 4"
            },
            {
                '_id': tagIds[15],
                'titulo': "Marvel"
            },
            {
                '_id': tagIds[16],
                'titulo': "Vingadores"
            },
            {
                '_id': tagIds[17],
                'titulo': "Marvel's Avengers"
            },
            {
                '_id': tagIds[18],
                'titulo': "Square Enix"
            },
            {
                '_id': tagIds[19],
                'titulo': "Crystal Dynamics"
            },
            {
                '_id': tagIds[20],
                'titulo': "Crystal Northwest"
            },
            {
                '_id': tagIds[21],
                'titulo': "Eidos Montréal"
            },
        ]
    }
];