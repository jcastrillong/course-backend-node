// Requerir librerias y frameworks
const express = require("express");

const routerApi = require("./routes");

// Crear la app, con el constructor de express
const app = express();
const port = 3000; // Definiendo un puerto donde correrá el servidor

// Middlewares
app.use(express.json());

// -----------
routerApi(app);

// Iniciando el servidor, colocandolo a escuchar en un puerto
app.listen(port, () => {
  console.log(`Starting in port ${port}`);
});
