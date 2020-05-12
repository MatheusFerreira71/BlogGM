var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const routerC = require("./routes/categoria");
const routerP = require("./routes/post");
const routerT = require("./routes/tag");
const routerU = require("./routes/usuario");
const RouterCo = require("./routes/comentario");

var app = express();

// Importamos o código do módulo database e usamos a função connection para conectar ao banco de dados.
const database = require("./config/database");
database("mongodb://localhost:27017/BlogGM");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Inicialização das rotas.
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categoria", routerC);
app.use("/post", routerP);
app.use("/tag", routerT);
app.use("/usuario", routerU);
app.use("/comentario", RouterCo);

module.exports = app;
