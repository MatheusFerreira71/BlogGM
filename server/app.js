var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const RouterTags = require('./src/routes/tags');
const RouterPosts = require('./src/routes/posts');
const RouterUsuarios = require('./src/routes/usuarios');
const RouterComentarios = require('./src/routes/comentarios');
const RouterCategorias = require('./src/routes/categorias');

var app = express();

// Importamos o código do módulo database e usamos a função connection para conectar ao banco de dados.
const database = require('./src/config/database');
database('mongodb://localhost:27017/BlogGMRelacional');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tags', RouterTags);
app.use('/posts', RouterPosts);
app.use('/usuarios', RouterUsuarios);
app.use('/comentarios', RouterComentarios);
app.use('/categorias', RouterCategorias);

module.exports = app;
