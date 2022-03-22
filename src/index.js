// Requerir librerias y frameworks
const express = require("express");
const faker = require("faker");

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
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  // generando informacion aleatoria
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

/* Rutas que reciben parámetros
 * Tipo params
 * Solo un parámetro => "/nameRoute/:param" */
// Dinámico
app.get("/products/:id", (req, res) => {
  const { id } = req.params; // obteniendo los parametros
  res.json({
    id,
    name: "Product 2",
    price: 10000,
  });
});

/* esta ruta está chocando con la de arriba, la manera de 
solucionarlo es cambiando el orden y poner esta antes.
porque todo lo que sea específico debe ir antes de lo que
es dinámico */
// Específico
app.get("/products/filter", (req, res) => {
  res.send("Yo soy un filter");
});

// Varios parámetros => "/nameRoute/:firstParam/nameRoute2/:secondParam"
app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params; // Obteniendo los parámetros
  res.json({
    categoryId,
    productId,
  });
});

/* Tipo query
  * son parámetros opcionales, en el navegador se usan 
  de la sigte manera "/users?limit=10&offset=200" */
app.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No hay parámetros");
  }
});

// Iniciando el servidor, colocandolo a escuchar en un puerto
app.listen(port, () => {
  console.log(`Starting in port ${port}`);
});
