// Requerir librerias y frameworks
const express = require("express");

const routerApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("../middlewares/error.handler");

// Crear la app, con el constructor de express
const app = express();
const port = 3000; // Definiendo un puerto donde correrá el servidor

// Middlewares
app.use(express.json());

// -----------
routerApi(app);

// hay que tener en cuenta el orden de los middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciando el servidor, colocandolo a escuchar en un puerto
app.listen(port, () => {
  console.log(`Starting in port ${port}`);
});
