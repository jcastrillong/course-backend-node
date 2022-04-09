// Requerir librerias y frameworks
const express = require("express");
const cors = require("cors");

const routerApi = require("./routes");
const { checkApiKey } = require("./middlewares/auth.handler")
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

// Crear la app, con el constructor de express
const app = express();
const port = process.env.PORT || 3000; // Definiendo un puerto donde correrá el servidor

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.get("/nueva-ruta", checkApiKey, (req, res) => {
  res.send("Hola soy una nueva ruta");
})

// -----------
routerApi(app);

// hay que tener en cuenta el orden de los middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciando el servidor, colocandolo a escuchar en un puerto
app.listen(port, () => {
  console.log(`Starting in port ${port}`);
});
