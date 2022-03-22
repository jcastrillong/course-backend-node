// Requerir Express
const express = require("express");

// Crear la app, con el constructor de express
const app = express();
const port = 3000; // Definiendo un puerto donde correrá el servidor

// Rutas
// enviando solo texto
app.get("/", (req, res) => {
  res.send("Hola, Buenas Tardes!");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, Buenas Noches!");
});

// enviando json
app.get("/products", (req, res) => {
  res.json([
    {
      name: "Product 1",
      price: 5000,
    },
    {
      name: "Product 2",
      price: 10000,
    },
  ]);
});

// Rutas que reciben parámetros
// Solo un parámetro => "/nameRoute/:param"
app.get("/products/:id", (req, res) => {
  const { id } = req.params; // obteniendo los parametros
  res.json({
    id,
    name: "Product 2",
    price: 10000,
  });
});

// Varios parámetros => "/nameRoute/:firstParam/nameRoute2/:secondParam"
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params; // Obteniendo los parámetros
  res.json({
    categoryId,
    productId,
  });
});

// Iniciando el servidor, colocandolo a escuchar en un puerto
app.listen(port, () => {
  console.log(`Starting in port ${port}`);
});
